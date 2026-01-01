import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSearch, AlertCircle, CheckCircle, TrendingUp, Target, Zap, Shield } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { PageHero } from '../../components/ui/PageHero';
import { Button } from '../../components/ui/Button';
import { SkillBadge } from '../../components/cards/SkillBadge.tsx';
import { RadialScore } from '../../components/charts/RadialScore';
import { ResumeSelector } from '../../components/resume/ResumeSelector';
import { matchJobDescription } from '../../api/jd.api';
import { getMyHistory } from '../../api/history.api';

export const JDMatch = () => {
  const [searchParams] = useSearchParams();
  const [resumeId, setResumeId] = useState('');
  const [selectedResumeName, setSelectedResumeName] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill resume ID from URL parameter or history
  useEffect(() => {
    const urlResumeId = searchParams.get('resumeId');
    if (urlResumeId) {
      setResumeId(urlResumeId);
      setError('');
      console.log('Auto-filled resume ID from URL:', urlResumeId);
    } else {
      loadMostRecentResume();
    }
  }, [searchParams]);

  // Load most recent resume from history
  const loadMostRecentResume = async () => {
    try {
      const history = await getMyHistory();
      console.log('Full history array:', history);
      
      if (history && history.length > 0) {
        // Sort by created_at date to be sure (newest first)
        const sortedHistory = [...history].sort((a, b) => {
          const dateA = new Date(a.created_at || 0);
          const dateB = new Date(b.created_at || 0);
          return dateB.getTime() - dateA.getTime(); // Descending (newest first)
        });
        
        console.log('Sorted history (first 3):', sortedHistory.slice(0, 3));
        
        // Get the most recent item
        const mostRecent = sortedHistory[0];
        const resumeId = mostRecent.resume_id || mostRecent.id;
        const filename = mostRecent.filename || 'Resume Analysis';
        setResumeId(resumeId);
        setSelectedResumeName(filename);
        setError('');
        console.log('Auto-filled resume ID:', resumeId, 'from most recent history item:', mostRecent);
        console.log('Selected item created_at:', mostRecent.created_at);
      } else {
        setError('No resumes found in history. Please upload a resume first.');
      }
    } catch (err) {
      console.error('Failed to load history:', err);
      setError('Failed to load resume history. Please select a resume from the dropdown.');
    }
  };

  // Quick fix: Use a known working resume ID for testing
  const useTestResumeId = () => {
    setResumeId('6953d15166e646cd26c8a80b');
    setError('');
    console.log('Using test resume ID: 6953d15166e646cd26c8a80b');
  };

  const handleMatch = async () => {
    if (!resumeId || !jobDescription) {
      setError('Please select a resume and provide a Job Description');
      return;
    }

    // Validate resume ID format (MongoDB ObjectId should be 24 hex characters)
    if (!/^[0-9a-fA-F]{24}$/.test(resumeId)) {
      setError('Invalid resume selected. Please try selecting a different resume or re-upload your resume.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Attempting JD match with resumeId:', resumeId);
      const data = await matchJobDescription(resumeId, jobDescription);
      console.log('JD match response:', data);
      setResult(data);
    } catch (err: any) {
      console.error('JD match error:', err);
      console.error('Error response:', err.response?.data);
      
      // Provide more specific error messages
      if (err.response?.status === 404) {
        const errorMessage = err.response?.data?.detail || 'Resume not found';
        if (errorMessage.includes('analysis not completed')) {
          setError('Resume analysis not completed. The resume may still be processing. Please wait a few minutes and try again, or re-upload the resume.');
        } else {
          setError('Resume not found. The resume ID might be from an old format, or the resume analysis may not be completed. Try clicking "Auto-fill" to get the correct ID, use "Test ID" for a working example, or re-upload the resume.');
        }
      } else if (err.response?.status === 403) {
        setError('Not authorized to access this resume. Please use your own resume ID.');
      } else {
        setError(err.response?.data?.detail || 'Failed to match job description');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Premium Hero Section */}
        <PageHero
          title="Compare with Job Description"
          subtitle="See how well your resume matches any job description. Get instant feedback on keywords, skills, and optimization opportunities."
          icon={Target}
          badge="AI Matching"
        />

        {/* Premium Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 border border-glass-border hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Resume Selection Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <Shield className="w-6 h-6 text-text-inverse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Your Resume</h3>
                    <p className="text-sm text-text-secondary">Select the resume to analyze</p>
                  </div>
                </div>
                
                <ResumeSelector
                  selectedResumeId={resumeId}
                  onResumeSelect={(id, filename) => {
                    setResumeId(id);
                    setSelectedResumeName(filename);
                    setError('');
                  }}
                  disabled={loading}
                  className="w-full"
                />
              </div>

              {/* Job Description Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                    <FileSearch className="w-6 h-6 text-text-inverse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Job Description</h3>
                    <p className="text-sm text-text-secondary">Paste the job posting details</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-text-primary">
                    Job Description
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-border-medium rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all resize-none bg-bg-surface/80 backdrop-blur-sm"
                    placeholder="Paste the complete job description here..."
                  />
                </div>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 rounded-xl p-4 flex items-start gap-3 backdrop-blur-sm ${
                  error.includes('No resumes found') 
                    ? 'bg-yellow-50/80 border border-yellow-200/50' 
                    : 'bg-red-50/80 border border-red-200/50'
                }`}
              >
                <AlertCircle className={`mt-0.5 ${error.includes('No resumes found') ? 'text-yellow-600' : 'text-red-600'}`} size={20} />
                <div className="flex-1">
                  <span className={`font-medium ${error.includes('No resumes found') ? 'text-yellow-600' : 'text-red-600'}`}>
                    {error}
                  </span>
                  {error.includes('Resume not found') && (
                    <div className="mt-3 text-sm space-y-2">
                      <p className="font-semibold text-gray-700">Try these solutions:</p>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>Select a different resume from the dropdown</li>
                        <li>Upload a new resume if needed</li>
                        <li>Check your resume in the History page</li>
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Button
                onClick={handleMatch}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-text-inverse font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Analyzing Match...
                  </>
                ) : (
                  <>
                    <FileSearch size={24} />
                    Analyze Match
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Premium Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Match Score Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 border border-purple-200"
            >
              {/* Background effects */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -top-32 -left-32 animate-float"></div>
                <div className="absolute w-64 h-64 bg-pink-400/20 rounded-full blur-3xl top-1/2 -right-32 animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="relative">
                    <RadialScore 
                      score={result.match_analysis?.ats_match_score || 0} 
                      label="" 
                      showScore={true}
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm text-gray-600 font-medium mt-12"
                  >
                    Match Score
                  </motion.div>
                </div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl font-bold text-text-primary mb-3"
                >
                  Your Resume Matches {result.match_analysis?.ats_match_score || 0}%
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg text-text-secondary max-w-2xl mx-auto"
                >
                  {(result.match_analysis?.ats_match_score || 0) >= 80 ? 'Excellent match! Your resume is well-aligned with this job description.' :
                   (result.match_analysis?.ats_match_score || 0) >= 60 ? 'Good match! With a few optimizations, you could be a strong candidate.' :
                   'Room for improvement. Let us help you optimize your resume for this role.'}
                </motion.p>
              </div>
            </motion.div>

            {/* Keywords Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-2xl p-6 border border-glass-border hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                    <CheckCircle className="w-6 h-6 text-text-inverse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Matched Keywords</h3>
                    <p className="text-sm text-text-secondary">Skills you already have</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.match_analysis?.matched_skills?.length > 0 ? (
                    result.match_analysis.matched_skills.map((keyword: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                      >
                        <SkillBadge skill={keyword} type="success" />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No matched keywords found</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="glass rounded-2xl p-6 border border-glass-border hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
                    <AlertCircle className="w-6 h-6 text-text-inverse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Missing Keywords</h3>
                    <p className="text-sm text-text-secondary">Skills to add or highlight</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.match_analysis?.missing_skills?.length > 0 ? (
                    result.match_analysis.missing_skills.map((keyword: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                      >
                        <SkillBadge skill={keyword} type="danger" />
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No missing keywords - great job!</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Suggestions Section */}
            {result.suggestions && result.suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="glass rounded-2xl p-8 border border-glass-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                    <TrendingUp className="w-6 h-6 text-text-inverse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">AI Recommendations</h3>
                    <p className="text-sm text-text-secondary">Personalized suggestions to improve your match</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {(result.match_analysis?.ats_improvement_suggestions || []).map((suggestion: string, index: number) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all"
                    >
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex-shrink-0">
                        <Zap className="w-4 h-4 text-text-inverse" />
                      </div>
                      <span className="text-text-primary leading-relaxed">{suggestion}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
};

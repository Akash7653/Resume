import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle, Zap, Shield, Target, Star } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { PageHero } from '../../components/ui/PageHero';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/Progress';
import { analyzeResumeAsync } from '../../api/resume.api';
import { useWebSocket } from '../../hooks/useWebSocket';
import { useResume } from '../../hooks/useResume';

export const UploadResume = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { setCurrentResume, setAnalysisResult } = useResume();
  const { status, progress } = useWebSocket(taskId!, (result: any) => {
    setAnalysisResult(result);
    console.log('WebSocket result received:', result);
    // Extract resume_id from the result if available
    if (result && result.resume_id) {
      console.log('Setting resumeId from WebSocket result:', result.resume_id);
      setResumeId(result.resume_id);
      // Update currentResume with the correct resume_id
      setCurrentResume((prev: any) => ({ ...prev, id: result.resume_id }));
    }
    if (result && result.ui) {
      console.log('Result has ui field with data:', result.ui);
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(selectedFile.type)) {
      setError('Please upload a PDF or Word document');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const response = await analyzeResumeAsync(file);
      console.log('API response received:', response);
      setTaskId(response.task_id);
      // Note: resume_id will come from WebSocket result, not initial API response
      setCurrentResume({ id: response.history_id, file: file.name });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Upload failed. Please try again.');
      setUploading(false);
    }
  };

  if ((status === 'SUCCESS' || status === 'completed') && resumeId) {
    console.log('Analysis complete, showing JD Match options with resumeId:', resumeId);
    // Show premium success state with options
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 border border-green-200"
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-64 h-64 bg-green-400/20 rounded-full blur-3xl -top-32 -left-32 animate-float"></div>
            <div className="absolute w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl top-1/2 -right-32 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, duration: 1, type: "spring", stiffness: 100 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl">
                <CheckCircle className="w-16 h-16 text-text-inverse" />
              </div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-text-primary mb-4"
            >
              Analysis Complete!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto"
            >
              Your resume has been analyzed with our AI. Choose your next step to optimize your job search strategy.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-glass-border hover:shadow-xl transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl w-fit mb-3">
                  <Target className="w-6 h-6 text-text-inverse" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">Match with Jobs</h3>
                <p className="text-sm text-text-secondary">Compare your resume against specific job descriptions</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-glass-border hover:shadow-xl transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl w-fit mb-3">
                  <Zap className="w-6 h-6 text-text-inverse" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">AI Rewrite</h3>
                <p className="text-sm text-text-secondary">Let AI optimize your resume for maximum impact</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass p-6 rounded-2xl border border-glass-border hover:shadow-xl transition-all"
              >
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl w-fit mb-3">
                  <Star className="w-6 h-6 text-text-inverse" />
                </div>
                <h3 className="font-bold text-text-primary mb-2">View Results</h3>
                <p className="text-sm text-text-secondary">See detailed analysis and recommendations</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => navigate(`/jd-match?resumeId=${resumeId}`)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Target className="w-5 h-5" />
                Match with Job Description
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/rewrite?resumeId=${resumeId}`)}
                className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-purple-50 transition-all"
              >
                <Zap className="w-5 h-5" />
                Rewrite Resume
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate(`/result/${resumeId}`)}
                className="flex items-center gap-2 px-6 py-3 border-2 hover:bg-emerald-50 transition-all"
              >
                <Star className="w-5 h-5" />
                View Analysis Results
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  } else if (status === 'SUCCESS' || status === 'completed') {
    console.log('Status is SUCCESS but resumeId is missing:', { status, resumeId });
  }

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Premium Hero Section */}
        <PageHero
          title="Analyze a New Resume"
          subtitle="Upload your resume for AI-powered analysis and optimization. Get instant feedback to improve your chances of landing interviews."
          icon={Upload}
          badge="AI Analysis"
        />

        {/* Premium Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass rounded-3xl p-8 border border-white/20 hover:shadow-2xl transition-all duration-300">
            {!uploading ? (
              <>
                <motion.div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative overflow-hidden rounded-2xl p-12 text-center transition-all ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50/50 border-2'
                      : file
                      ? 'border-green-500 bg-green-50/50 border-2'
                      : 'border-gray-300 hover:border-blue-400 border-2 border-dashed'
}`}
                whileHover={{ scale: dragActive ? 1 : 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-dark-bg dark:via-dark-surface dark:to-dark-gradient-start opacity-50"></div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  className="hidden"
                />

                <div className="relative z-10">
                  <AnimatePresence mode="wait">
                    {!file ? (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="flex justify-center"
                        >
                          <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl">
                            <Upload className="w-16 h-16 text-text-inverse" />
                          </div>
                        </motion.div>
                        
                        <div className="space-y-4">
                          <h3 className="text-2xl font-bold text-text-primary">
                            Drop your resume here
                          </h3>
                          <p className="text-lg text-text-secondary">or click to browse</p>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              onClick={() => fileInputRef.current?.click()}
                              className="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple hover:from-blue-600 hover:to-purple-700 text-text-inverse font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                            >
                              Select File
                            </Button>
                          </motion.div>
                          <p className="text-sm text-text-secondary flex items-center gap-1">
                            <Shield className="w-4 h-4" />
                            Supports PDF, DOC, DOCX (Max 10MB) • Secure Processing
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="selected"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="flex justify-center"
                        >
                          <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl">
                            <CheckCircle className="w-16 h-16 text-text-inverse" />
                          </div>
                        </motion.div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-center gap-3">
                            <FileText className="text-text-secondary" size={24} />
                            <h3 className="text-2xl font-bold text-text-primary">
                              {file.name}
                            </h3>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
                          </p>
                          <div className="flex gap-4 justify-center">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                onClick={handleUpload}
                                className="px-8 py-4 bg-gradient-to-r from-accent-green to-accent-emerald hover:from-green-700 hover:to-emerald-700 text-text-inverse font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                              >
                                <Zap className="w-5 h-5" />
                                Analyze Resume
                              </Button>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setFile(null);
                                  setError('');
                                }}
                                className="px-8 py-4 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                              >
                                Remove
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4 flex items-start gap-3"
                >
                  <AlertCircle className="text-red-600 mt-0.5" size={20} />
                  <span className="text-red-600 font-medium">{error}</span>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex justify-center mb-8"
              >
                <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl">
                  <FileText className="w-16 h-16 text-text-inverse" />
                </div>
              </motion.div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-text-primary">
                  {status === 'SUCCESS' ? 'Analysis Complete!' : 
                   status === 'PROCESSING' || status === 'processing' ? 'Analyzing Resume...' : 
                   'Processing...'}
                </h3>
                <p className="text-lg text-text-secondary">
                  Our AI is analyzing your resume. This may take a moment.
                </p>
                
                <div className="max-w-md mx-auto space-y-3">
                  <Progress value={progress} max={100} className="h-3" />
                  <div className="flex items-center justify-center gap-2">
                    <CircularProgress value={progress} size={80} strokeWidth={8} showPercentage={false} />
                    <span className="text-2xl font-bold text-text-primary">{Math.round(progress)}%</span>
                  </div>
                </div>

                {status && status !== 'pending' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="mt-6 glass rounded-xl p-4 max-w-md mx-auto border border-glass-border"
                  >
                    <p className="text-sm font-medium text-accent-blue">Status: {status}</p>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4 flex items-start gap-3"
        >
          <AlertCircle className="text-red-600 mt-0.5" size={20} />
          <span className="text-red-600 font-medium">{error}</span>
        </motion.div>
      )}
      </div>
    </PageWrapper>
  );
};

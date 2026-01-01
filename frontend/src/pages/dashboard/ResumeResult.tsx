import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TrendingUp, AlertCircle, CheckCircle, Lightbulb, FileText, XCircle } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Badge } from '../../components/ui/Badge';
import { SkillBadge } from '../../components/cards/SkillBadge.tsx';
import { SectionScoreCard } from '../../components/cards/SectionScoreCard';
import { ProjectCard } from '../../components/cards/ProjectCard';
import { RadialScore } from '../../components/charts/RadialScore';
import { getResumeResult, ResumeAnalysisResult } from '../../api/resume.api';
import { getVerdictColor } from '../../utils/formatters';

export const ResumeResult = () => {
  const { resumeId } = useParams();
  const [result, setResult] = useState<ResumeAnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always load mock data if no resumeId or API fails
    if (!resumeId) {
      const mockData = {
        verdict: 'Strong Match',
        ats_score: 75,
        resume_strength: { score: 68 },
        resume_quality: { overall_score: 59 },
        matched_skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python'],
        missing_skills: ['Docker', 'Kubernetes', 'AWS'],
        section_analysis: [
          { section: 'Experience', score: 88, feedback: 'Good experience description' },
          { section: 'Education', score: 95, feedback: 'Strong educational background' },
          { section: 'Skills', score: 82, feedback: 'Relevant skills highlighted' }
        ],
        improvement_tips: {
          action_items: [
            'Add quantifiable achievements to your experience',
            'Include more technical keywords for ATS optimization',
            'Consider adding a summary section at the top'
          ],
          projects: [
            { name: 'E-commerce Platform', description: 'Built with React and Node.js' },
            { name: 'Data Analytics Dashboard', description: 'Python-based visualization tool' }
          ]
        }
      };
      console.log('Using initial mock data:', mockData);
      setResult(mockData);
      setLoading(false);
    } else {
      loadResult();
    }
  }, [resumeId]);

  // Extract skills and sections from the API response structure
  const apiResult = result as any; // Type assertion to handle API response structure
  const matchedSkills = apiResult?.improvements?.strengths || [];
  const missingSkills = apiResult?.improvements?.weaknesses || [];
  const sectionAnalysis = apiResult?.resume_quality?.section_scores ? 
    Object.entries(apiResult.resume_quality.section_scores).map(([key, data]: [string, any]) => ({
      section: key.charAt(0).toUpperCase() + key.slice(1),
      score: data.score,
      feedback: data.feedback
    })) : [];

  // Debug: Log when result changes
  useEffect(() => {
    if (result) {
      console.log('Data extracted:', {
        matchedSkills: matchedSkills,
        missingSkills: missingSkills,
        sectionAnalysis: sectionAnalysis
      });
    }
  }, [result, matchedSkills, missingSkills, sectionAnalysis]);

  const loadResult = async () => {
    setLoading(true);
    try {
      const data = await getResumeResult(resumeId!);
      console.log('API Response:', JSON.stringify(data, null, 2));
      setResult(data);
    } catch (err) {
      console.error('Failed to load resume result:', err);
      // Set fallback mock data when API fails
      const fallbackData = {
        verdict: 'Strong Match',
        ats_score: 75,
        resume_strength: { score: 68 },
        resume_quality: { overall_score: 59 },
        matched_skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python'],
        missing_skills: ['Docker', 'Kubernetes', 'AWS'],
        section_analysis: [
          { section: 'Experience', score: 88, feedback: 'Good experience description' },
          { section: 'Education', score: 95, feedback: 'Strong educational background' },
          { section: 'Skills', score: 82, feedback: 'Relevant skills highlighted' }
        ],
        improvement_tips: {
          action_items: [
            'Add quantifiable achievements to your experience',
            'Include more technical keywords for ATS optimization',
            'Consider adding a summary section at the top'
          ],
          projects: [
            { name: 'E-commerce Platform', description: 'Built with React and Node.js' },
            { name: 'Data Analytics Dashboard', description: 'Python-based visualization tool' }
          ]
        }
      };
      console.log('Using fallback data:', fallbackData);
      setResult(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PageWrapper>
    );
  }

  if (!result) {
    return (
      <PageWrapper>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
          <p className="text-red-600">{'Result not found'}</p>
        </div>
      </PageWrapper>
    );
  }

  // Debug: Log the result to see what data we have
  console.log('ResumeResult data:', result);

  return (
    <PageWrapper showWelcome={false} pageTitle="Resume Analysis">
      <div className="space-y-6">
        {/* Page title - mobile only */}
        <div className="block lg:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Analysis</h1>
              <p className="text-sm text-gray-600">Detailed breakdown of your resume</p>
            </div>
          </div>
        </div>

        {/* Verdict badge - desktop only */}
        <div className="hidden lg:flex items-center justify-end">
          {result.verdict && (
            <Badge className={getVerdictColor(result.verdict)}>{result.verdict}</Badge>
          )}
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ATS Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                <RadialScore 
                  score={result.ats_score || 0} 
                  maxScore={100} 
                  size="large"
                  label=""
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">ATS Score</h3>
            </div>
          </div>

          {/* Resume Strength */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                <RadialScore 
                  score={result.resume_strength?.score || 0} 
                  maxScore={100} 
                  size="large"
                  label=""
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">Resume Strength</h3>
            </div>
          </div>

          {/* Resume Quality */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-4">
                <RadialScore 
                  score={result.resume_quality?.overall_score || 0} 
                  maxScore={100} 
                  size="large"
                  label=""
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">Resume Quality</h3>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="text-blue-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Matched Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {matchedSkills.map((skill: string, index: number) => (
                <SkillBadge key={index} skill={skill} type="matched" />
              ))}
              {matchedSkills.length === 0 && (
                <p className="text-gray-500 text-sm">No matched skills found</p>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <XCircle className="text-orange-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Missing Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {missingSkills.map((skill: string, index: number) => (
                <SkillBadge key={index} skill={skill} type="missing" />
              ))}
              {missingSkills.length === 0 && (
                <p className="text-gray-500 text-sm">No missing skills found</p>
              )}
            </div>
          </div>
        </div>

        {/* Section Analysis */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="text-purple-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Section Analysis</h3>
          </div>
          <div className="space-y-4">
            {sectionAnalysis.map((section, index) => (
              <SectionScoreCard key={index} section={section} index={index} />
            ))}
            {sectionAnalysis.length === 0 && (
              <p className="text-gray-500 text-sm">No section analysis available</p>
            )}
          </div>
        </div>

        {/* Improvement Tips */}
        {result.improvement_tips?.action_items && result.improvement_tips.action_items.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Lightbulb className="text-yellow-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Improvement Tips</h3>
            </div>
            <ul className="space-y-3">
              {(result.improvement_tips?.action_items || []).map((tip, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50/80 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                    <CheckCircle className="text-blue-600" size={16} />
                  </div>
                  <span className="text-gray-700 text-sm leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommended Projects */}
        {result.improvement_tips?.projects && result.improvement_tips.projects.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Recommended Projects</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(result.improvement_tips?.projects || []).map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

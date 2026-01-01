import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { History as HistoryIcon, Trash2, AlertCircle, FileText, Calendar, TrendingUp, Eye } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { PageHero } from '../../components/ui/PageHero';
import { CircularProgress } from '../../components/ui/CircularProgress';
import { Button } from '../../components/ui/Button';
import { getMyHistory, HistoryItem, deleteResume } from '../../api/history.api';
import { formatDate } from '../../utils/formatters';

export const History = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getMyHistory();
      setHistory(data);
    } catch (err: any) {
      setError('Failed to load history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (item: HistoryItem) => {
    if (!confirm('Are you sure you want to permanently delete this resume and all its analysis? This action cannot be undone.')) {
      return;
    }

    try {
      // Use the actual resume_id, not the history record id
      const resumeId = item.resume_id || item.id;
      console.log('Attempting to delete resume with ID:', resumeId, 'from history item:', item);
      
      // Delete the resume and its analysis
      await deleteResume(resumeId);
      
      // Refetch history to get updated list from server
      await loadHistory();
      
      alert('Resume deleted successfully!');
    } catch (err: any) {
      console.error('Failed to delete resume:', err);
      alert(err.response?.data?.detail || 'Failed to delete resume');
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

  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Premium Hero Section */}
        <PageHero
          title="Analysis History"
          subtitle="Track your resume optimization journey. View all your past analyses, scores, and improvements over time."
          icon={HistoryIcon}
          badge="Your Progress"
        />

        {/* History Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 border border-red-200/50 text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-2xl">
                  <AlertCircle className="w-12 h-12 text-text-inverse" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h3>
              <p className="text-red-500">{error}</p>
            </motion.div>
          )}

          {!error && history.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-3xl p-12 border border-white/20 text-center"
            >
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center mb-6"
              >
                <div className="p-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl shadow-2xl">
                  <HistoryIcon className="w-16 h-16 text-text-inverse" />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No Analysis History Yet</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Start your journey to a perfect resume. Upload your first resume to see AI-powered insights and recommendations.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => navigate('/upload')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-text-inverse font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Upload Your First Resume
                </Button>
              </motion.div>
            </motion.div>
          )}

          {history.length > 0 && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                      <FileText className="w-6 h-6 text-text-inverse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Total Analyses</h3>
                      <p className="text-sm text-gray-600">Resumes processed</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">{history.length}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
                      <TrendingUp className="w-6 h-6 text-text-inverse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Avg ATS Score</h3>
                      <p className="text-sm text-gray-600">Resume quality</p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    {history.filter(item => item.ats_score !== undefined).length > 0 
                      ? Math.round(history.filter(item => item.ats_score !== undefined).reduce((acc, item) => acc + (item.ats_score || 0), 0) / history.filter(item => item.ats_score !== undefined).length)
                      : '—'}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
                      <Calendar className="w-6 h-6 text-text-inverse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Last Analysis</h3>
                      <p className="text-sm text-gray-600">Most recent</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-purple-600">
                    {history.length > 0 ? formatDate(history[0].created_at) : '—'}
                  </p>
                </motion.div>
              </motion.div>

              {/* History Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {history.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="glass rounded-2xl p-6 border border-white/20 hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                            <FileText className="w-5 h-5 text-text-inverse" />
                          </div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {item.filename || 'Resume Analysis'}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.created_at)}</span>
                          </div>
                          {item.ats_score !== undefined && (
                            <div className="flex items-center gap-2">
                              <CircularProgress 
                                value={item.ats_score} 
                                size={40} 
                                strokeWidth={4}
                                gradient="from-green-500 to-emerald-500"
                                showPercentage={false}
                              />
                              <span className="font-semibold text-green-600">{item.ats_score}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/result/${item.resume_id || item.id}`)}
                          className="flex items-center gap-2 px-4 py-2 border-2 hover:bg-blue-50 transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Button>
                      </motion.div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteResume(item)}
                          className="flex items-center gap-2 px-4 py-2 border-2 hover:bg-red-50 transition-all"
                          title="Delete resume"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </PageWrapper>
  );
};

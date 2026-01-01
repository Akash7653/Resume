import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getMyHistory, HistoryItem } from '../../api/history.api';
import { formatDate } from '../../utils/formatters';

interface ResumeSelectorProps {
  selectedResumeId: string;
  onResumeSelect: (resumeId: string, filename: string) => void;
  disabled?: boolean;
  className?: string;
}

export const ResumeSelector = ({ 
  selectedResumeId, 
  onResumeSelect, 
  disabled = false,
  className = ""
}: ResumeSelectorProps) => {
  const [resumes, setResumes] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const data = await getMyHistory();
      setResumes(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load resumes');
      console.error('Failed to load resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedResume = resumes.find(r => (r.resume_id || r.id) === selectedResumeId);

  const handleSelect = (resume: HistoryItem) => {
    const resumeId = resume.resume_id || resume.id;
    const filename = resume.filename || 'Resume Analysis';
    onResumeSelect(resumeId, filename);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-3 p-4 border border-border-medium rounded-xl bg-bg-surface/80 backdrop-blur-sm">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="text-text-secondary">Loading resumes...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-3 p-4 border border-red-200 rounded-xl bg-red-50/80">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-600">{error}</span>
        </div>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <div className="flex items-center gap-3 p-4 border border-border-medium rounded-xl bg-bg-surface/80 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 text-gray-400" />
          <span className="text-text-secondary">No resumes found. Please upload a resume first.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Selected Resume Display */}
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
          selectedResume 
            ? 'border-green-500 bg-green-50/80' 
            : 'border-border-medium bg-bg-surface/80 hover:border-accent-blue'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <div className={`p-2 rounded-lg ${
          selectedResume 
            ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
            : 'bg-gradient-to-br from-blue-500 to-indigo-500'
        }`}>
          <FileText className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="font-semibold text-text-primary">
            {selectedResume ? selectedResume.filename : 'Select a resume'}
          </div>
          {selectedResume && (
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(selectedResume.created_at)}</span>
              {selectedResume.ats_score !== undefined && (
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span>{selectedResume.ats_score}% ATS</span>
                </span>
              )}
            </div>
          )}
        </div>

        {!disabled && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="text-text-secondary"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-border-medium rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-2">
            {resumes.map((resume) => {
              const resumeId = resume.resume_id || resume.id;
              const isSelected = resumeId === selectedResumeId;
              
              return (
                <motion.div
                  key={resume.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => handleSelect(resume)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                      : 'hover:bg-gray-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected 
                        ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                        : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                    }`}>
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className={`font-medium ${
                        isSelected ? 'text-green-700 dark:text-green-300' : 'text-text-primary'
                      }`}>
                        {resume.filename || 'Resume Analysis'}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(resume.created_at)}</span>
                        {resume.ats_score !== undefined && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            <span>{resume.ats_score}% ATS</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
};

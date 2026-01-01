import axiosInstance from './axios';

export interface ResumeAnalysisResult {
  verdict: string;
  ats_score: number;
  resume_strength: { score: number };
  resume_quality: { overall_score: number };
  matched_skills: string[];
  missing_skills: string[];
  section_analysis: Array<{
    section: string;
    score: number;
    feedback: string;
  }>;
  improvement_tips: {
    action_items: string[];
    projects: Array<{
      name: string;
      description: string;
    }>;
  };
}

export const analyzeResumeAsync = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/resume/analyze-async', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getResumeStatus = async (taskId: string) => {
  const response = await axiosInstance.get(`/resume/status/${taskId}`);
  return response.data;
};

export const getResumeResult = async (resumeId: string): Promise<ResumeAnalysisResult> => {
  const response = await axiosInstance.get(`/resume/result/${resumeId}`);
  return response.data;
};

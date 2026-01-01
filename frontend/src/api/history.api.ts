import axiosInstance from './axios';

export interface HistoryItem {
  id: string;
  resume_id?: string;
  filename?: string;
  verdict?: string;
  created_at: string;
  updated_at?: string;
  status?: string;
  role?: string;
  ats_score?: number;
  resume_strength?: string;
  overall_score?: number;
  task_id?: string;
  error?: string;
}

export const getMyHistory = async (): Promise<HistoryItem[]> => {
  const response = await axiosInstance.get('/history/my');
  return response.data;
};

export const downloadResume = async (resumeId: string): Promise<string> => {
  const response = await axiosInstance.get(`/resume/download/${resumeId}`, {
    responseType: 'blob'
  });
  
  // Create a blob URL for the PDF
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = window.URL.createObjectURL(blob);
  return url;
};

export const deleteResume = async (resumeId: string): Promise<void> => {
  const response = await axiosInstance.delete(`/resume/delete/${resumeId}`);
  return response.data;
};

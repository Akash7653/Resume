import axiosInstance from './axios';

export interface AnalyticsData {
  total_resumes?: number;
  analyzed_candidates?: number;
  avg_match_score?: number;
  avg_processing_time?: number;
  top_skills?: Array<{ name: string; count: number }>;
  monthly_data?: Array<{ name: string; value: number }>;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const response = await axiosInstance.get('/analytics/dashboard');
  return response.data;
};

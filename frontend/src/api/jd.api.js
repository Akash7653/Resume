import axiosInstance from './axios';

export const matchJobDescription = async (resumeId, jobDescription) => {
  const response = await axiosInstance.post('/jd/match', {
    resume_id: resumeId,
    job_description: jobDescription,
  });
  return response.data;
};

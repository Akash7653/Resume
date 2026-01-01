import axiosInstance from './axios';

export const rewriteResume = async (resumeId, targetRole, candidateLevel) => {
  const response = await axiosInstance.post('/resume/rewrite', {
    resume_id: resumeId,
    target_role: targetRole,
    candidate_level: candidateLevel,
  });
  return response.data;
};

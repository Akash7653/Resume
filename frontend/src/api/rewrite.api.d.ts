export interface RewriteResult {
  rewritten_bullets: string[];
  improvements: string[];
}

export const rewriteResume: (resumeId: string, targetRole: string, candidateLevel: string) => Promise<RewriteResult>;

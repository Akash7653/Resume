export interface JDMatchResult {
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
  suggestions: string[];
}

export const matchJobDescription: (resumeId: string, jobDescription: string) => Promise<JDMatchResult>;

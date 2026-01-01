export interface HistoryItem {
  id: string;
  filename: string;
  verdict: string;
  created_at: string;
  ats_score: number;
}

export const getMyHistory: () => Promise<HistoryItem[]>;
export const deleteHistory: (resumeId: string) => Promise<any>;

import { createContext, useState, ReactNode } from 'react';

interface Resume {
  id: string;
  name: string;
  content: string;
  [key: string]: any;
}

interface AnalysisResult {
  scores: any;
  suggestions: any;
  [key: string]: any;
}

interface ResumeContextType {
  currentResume: Resume | null;
  setCurrentResume: (resume: Resume | null) => void;
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  clearResume: () => void;
}

interface ResumeProviderProps {
  children: ReactNode;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: ResumeProviderProps) => {
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const clearResume = () => {
    setCurrentResume(null);
    setAnalysisResult(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        currentResume,
        setCurrentResume,
        analysisResult,
        setAnalysisResult,
        clearResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

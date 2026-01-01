import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UsageContextType {
  uploadCount: number;
  incrementUploadCount: () => void;
  hasReachedLimit: () => boolean;
  remainingUploads: number;
  isPremium: boolean;
  upgradeToPlan: (plan: 'pro' | 'premium') => void;
}

const UsageContext = createContext<UsageContextType | undefined>(undefined);

export const useUsage = () => {
  const context = useContext(UsageContext);
  if (!context) {
    throw new Error('useUsage must be used within a UsageProvider');
  }
  return context;
};

interface UsageProviderProps {
  children: ReactNode;
}

export const UsageProvider: React.FC<UsageProviderProps> = ({ children }) => {
  const [uploadCount, setUploadCount] = useState(() => {
    // Get upload count from localStorage or default to 0
    const saved = localStorage.getItem('resume_upload_count');
    return saved ? parseInt(saved) : 0;
  });
  
  const [isPremium, setIsPremium] = useState(() => {
    // Check if user has premium (in real app, this would come from auth/user data)
    return localStorage.getItem('user_plan') !== 'free';
  });

  const FREE_UPLOAD_LIMIT = 10;

  const incrementUploadCount = () => {
    if (isPremium) return; // No limit for premium users
    
    const newCount = uploadCount + 1;
    setUploadCount(newCount);
    localStorage.setItem('resume_upload_count', newCount.toString());
  };

  const hasReachedLimit = () => {
    return !isPremium && uploadCount >= FREE_UPLOAD_LIMIT;
  };

  const remainingUploads = Math.max(0, FREE_UPLOAD_LIMIT - uploadCount);

  const upgradeToPlan = (plan: 'pro' | 'premium') => {
    // In a real app, this would trigger the payment flow
    console.log(`Upgrading to ${plan} plan...`);
    // For demo, just mark as premium
    setIsPremium(true);
    localStorage.setItem('user_plan', plan);
  };

  return (
    <UsageContext.Provider
      value={{
        uploadCount,
        incrementUploadCount,
        hasReachedLimit,
        remainingUploads,
        isPremium,
        upgradeToPlan,
      }}
    >
      {children}
    </UsageContext.Provider>
  );
};

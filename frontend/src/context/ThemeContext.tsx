import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme to DOM
  const applyTheme = (newTheme: Theme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set theme and persist to backend
  const setTheme = async (newTheme: Theme) => {
    // Apply theme immediately for instant feedback
    setThemeState(newTheme);
    localStorage.setItem('resumeiq-theme', newTheme);
    applyTheme(newTheme);

    // TODO: Add backend sync when API is ready
    // For now, just save locally to avoid auth issues
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      setIsLoading(true);
      
      // Check localStorage first
      const stored = localStorage.getItem('resumeiq-theme');
      if (stored === 'light' || stored === 'dark') {
        setThemeState(stored);
        applyTheme(stored);
        setIsLoading(false);
        return;
      }
      
      // Fallback to system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setThemeState('dark');
        applyTheme('dark');
      } else {
        setThemeState('light');
        applyTheme('light');
      }
      
      setIsLoading(false);
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes (only if no user preference is set)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('resumeiq-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        setThemeState(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

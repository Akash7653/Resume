import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ThemeToggle = ({ size = 'md', className = '' }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();


  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative overflow-hidden rounded-2xl transition-all duration-300
        bg-bg-surface/80 backdrop-blur-sm border border-border-medium
        hover:bg-bg-surface hover:scale-105 active:scale-95
        ${sizeClasses[size]}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Sun Icon */}
        <motion.div
          initial={{ rotate: 0, scale: 1 }}
          animate={{ 
            rotate: theme === 'light' ? 0 : 180,
            scale: theme === 'light' ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Sun 
            size={iconSizes[size]} 
            className="text-accent-yellow" 
          />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ 
            rotate: theme === 'dark' ? 0 : -180,
            scale: theme === 'dark' ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute"
        >
          <Moon 
            size={iconSizes[size]} 
            className="text-accent-blue" 
          />
        </motion.div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-2xl" />
      </div>
    </motion.button>
  );
};

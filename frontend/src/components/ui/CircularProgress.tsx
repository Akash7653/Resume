import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  icon?: LucideIcon;
  label?: string;
  gradient?: string;
  showPercentage?: boolean;
}

export const CircularProgress = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 12,
  icon: Icon,
  label,
  gradient = "from-blue-600 via-purple-600 to-pink-600",
  showPercentage = true,
}: CircularProgressProps) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * ((size - strokeWidth) / 2);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {Icon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className={`p-2 bg-gradient-to-br ${gradient} rounded-lg mb-1`}
          >
            <Icon className="w-4 h-4 text-white" />
          </motion.div>
        )}
        {showPercentage && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {`${Math.round(percentage)}%`}
          </motion.span>
        )}
        {label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs text-gray-500 font-medium text-center"
          >
            {label}
          </motion.span>
        )}
      </div>
    </div>
  );
};

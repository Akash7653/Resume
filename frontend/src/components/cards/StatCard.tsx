import { LucideIcon, TrendingUp, TrendingDown, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradientFrom: string;
  gradientTo: string;
  delay?: number;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  gradientFrom,
  gradientTo,
  delay = 0,
}: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
      if (isNaN(numericValue)) return;

      let start = 0;
      const duration = 1000;
      const increment = numericValue / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setAnimatedValue(numericValue);
          clearInterval(timer);
        } else {
          setAnimatedValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const displayValue = value.includes('%') || value.includes('s')
    ? value
    : animatedValue.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative group"
    >
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        {/* Sparkle effect */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>

        <div className="relative flex items-start justify-between mb-6">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>

          {trend && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (delay + 200) / 1000 }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                trend.isPositive
                  ? 'bg-green-50/80 text-green-700 border-green-200'
                  : 'bg-red-50/80 text-red-700 border-red-200'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5" />
              )}
              {trend.value}
            </motion.div>
          )}
        </div>

        <div className="relative">
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{displayValue}</p>
            {value.includes('%') && (
              <div className="px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg">
                <span className="text-xs font-semibold text-blue-600">Score</span>
              </div>
            )}
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, LucideIcon, Sparkles, Zap } from 'lucide-react';

interface ScoreCardProps {
  title: string;
  score: string | number;
  icon: LucideIcon;
  trend?: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

export const ScoreCard = ({ title, score, icon: Icon, trend, color = 'blue' }: ScoreCardProps) => {
  const colors = {
    blue: 'from-blue-600 to-cyan-600',
    green: 'from-green-600 to-emerald-600',
    yellow: 'from-yellow-600 to-orange-600',
    red: 'from-red-600 to-rose-600',
    purple: 'from-purple-600 to-pink-600',
  };

  const bgColors = {
    blue: 'from-blue-500/10 to-cyan-500/10',
    green: 'from-green-500/10 to-emerald-500/10',
    yellow: 'from-yellow-500/10 to-orange-500/10',
    red: 'from-red-500/10 to-rose-500/10',
    purple: 'from-purple-500/10 to-pink-500/10',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/90 dark:bg-black/40 backdrop-blur-2xl rounded-2xl p-6 border border-gray-200 dark:border-purple-500/20 hover:border-purple-400/40 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColors[color]} opacity-30`}></div>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 dark:bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${colors[color]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`p-4 rounded-2xl bg-gradient-to-br ${colors[color]} relative overflow-hidden shadow-lg shadow-${color}-500/25`}
          >
            <Icon className="text-white relative z-10" size={24} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-white/50 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          {trend && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm ${
                trend > 0 
                  ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
              }`}
            >
              <motion.div
                animate={{ y: trend > 0 ? [0, -2, 0] : [0, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              </motion.div>
              <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
            </motion.div>
          )}
        </div>
        
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2"
        >
          {title}
        </motion.h3>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 dark:from-white to-gray-700 dark:to-gray-300 bg-clip-text text-transparent">
            {score}
          </p>
          {trend && trend > 0 && (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-purple-500/20 rounded-tr-xl"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-purple-500/20 rounded-bl-xl"></div>
    </motion.div>
  );
};

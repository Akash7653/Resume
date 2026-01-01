import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  gradient?: string;
  badge?: string;
}

export const PageHero = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  gradient = "from-blue-600 via-purple-600 to-pink-600",
  badge 
}: PageHeroProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8 mb-8"
    >
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -top-32 -left-32 animate-float"></div>
        <div className="absolute w-64 h-64 bg-purple-400/20 rounded-full blur-3xl top-1/2 -right-32 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-64 h-64 bg-pink-400/20 rounded-full blur-3xl -bottom-32 left-1/3 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-900 mb-2"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 max-w-2xl"
            >
              {subtitle}
            </motion.p>
          </div>

          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20"
            >
              <span className={`text-sm font-semibold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                {badge}
              </span>
            </motion.div>
          )}
        </div>

        {/* Story-driven section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 bg-gradient-to-br ${gradient} rounded-lg`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Why This Matters</h3>
              <p className="text-gray-600 leading-relaxed">
                Transform your resume from invisible to irresistible. Our AI-powered analysis helps you stand out in today's competitive job market by optimizing every section for maximum impact.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

import { Sidebar } from './Sidebar.tsx';
import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sparkles, Zap } from 'lucide-react';

interface PageWrapperProps {
  children: ReactNode;
  showWelcome?: boolean;
  pageTitle?: string;
}

export const PageWrapper = ({ children, showWelcome = true, pageTitle }: PageWrapperProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleResize = () => {
      checkMobile();
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural network animation */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20">
          <defs>
            <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="pageGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {[...Array(15)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="url(#pageGradient)"
              filter="url(#pageGlow)"
              animate={{
                cx: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                cy: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 12 + Math.random() * 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-purple-500/10 dark:border-purple-500/20 rounded-lg backdrop-blur-sm"
            style={{
              width: `${30 + Math.random() * 60}px`,
              height: `${30 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Advanced particle system */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2.5}px`,
              height: `${Math.random() * 2.5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${139 + Math.random() * 116}, ${92 + Math.random() * 163}, ${246 + Math.random() * 9}, 0.8) 0%, transparent 70%)`
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 80 - 40, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      <div className="flex relative z-10">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          isMobile={isMobile}
        />
        <div className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
        }`}>
          {/* Mobile Header with Hamburger Menu */}
          <AnimatePresence>
            {!sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white/90 dark:bg-black/40 backdrop-blur-2xl border-b border-gray-200 dark:border-purple-500/20 px-4 py-3 flex items-center justify-between relative overflow-hidden"
              >
                {/* Animated background for header */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400/30 dark:bg-purple-400/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        x: [0, Math.random() * 40 - 20],
                        y: [0, -10, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div 
                    className="p-2 bg-gradient-to-br from-purple-600 to-cyan-600 dark:from-purple-600 dark:to-cyan-600 rounded-lg relative overflow-hidden"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src="/logo.svg" 
                      alt="ResumeIQ" 
                      className="w-6 h-6 object-contain filter brightness-0 invert dark:brightness-0 relative z-10" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <motion.h1 
                    className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    ResumeIQ
                  </motion.h1>
                </div>
            <motion.button
              onClick={() => setSidebarOpen(true)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">
                <Menu className="w-5 h-5 text-gray-600 dark:text-white" />
              </span>
            </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <main className="h-[calc(100vh-60px)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {children}
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

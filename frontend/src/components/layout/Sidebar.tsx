import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Upload, Target, RefreshCw, History, LogOut, Sparkles, ChevronLeft, ChevronRight, Zap, Settings, User, Mail, CreditCard, Shield, Brain, Rocket, TrendingUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMobile?: boolean;
}

interface NavItem {
  to: string;
  icon: any;
  label: string;
  gradient: string;
  isLogout?: boolean;
}

export const Sidebar = ({ 
  isOpen = false, 
  onClose = () => {}, 
  isCollapsed = false, 
  onToggleCollapse = () => {}, 
  isMobile = false 
}: SidebarProps) => {
  const { logout, user } = useAuth();
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isSidebarOpen = isOpen !== undefined ? isOpen : internalOpen;

  const handleLogout = () => {
    logout();
  };

  const navItems: NavItem[] = [
    { to: '/dashboard', icon: Home, label: 'Your Resume Overview', gradient: 'from-blue-600 to-cyan-600' },
    { to: '/upload', icon: Upload, label: 'Analyze a New Resume', gradient: 'from-purple-600 to-pink-600' },
    { to: '/jd-match', icon: Target, label: 'Compare with Job Description', gradient: 'from-green-600 to-emerald-600' },
    { to: '/rewrite', icon: RefreshCw, label: 'AI Resume Rewrite', gradient: 'from-yellow-600 to-orange-600' },
    { to: '/history', icon: History, label: 'Analysis History', gradient: 'from-red-600 to-rose-600' },
    { to: '/pricing', icon: CreditCard, label: 'Upgrade Plan', gradient: 'from-emerald-600 to-teal-600' },
    { to: '/settings', icon: Settings, label: 'Settings', gradient: 'from-gray-600 to-slate-600' },
    { to: '#', icon: LogOut, label: 'Logout', gradient: 'from-red-600 to-rose-600', isLogout: true },
  ];

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : (isMobile ? -300 : 0) }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`
          fixed lg:relative top-0 left-0 h-screen bg-white/90 dark:bg-black/40 backdrop-blur-2xl border-r border-gray-200 dark:border-purple-500/20
          flex flex-col shadow-2xl z-50
          ${isCollapsed ? 'lg:w-20' : 'lg:w-80'} w-80
        `}
      >
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Neural network animation */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <linearGradient id="sidebarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={`${Math.random() * 100}%`}
                cy={`${Math.random() * 100}%`}
                r="1.5"
                fill="url(#sidebarGradient)"
                animate={{
                  cx: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  cy: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0.1, 0.5, 0.1],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
        
        {/* Website Header */}
        <div className="relative z-10 p-6 border-b border-gray-200 dark:border-purple-500/20">
          <div className={`flex items-center gap-4 ${isCollapsed && !isMobile ? 'lg:justify-center' : ''}`}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className={`p-4 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl shadow-lg shadow-purple-500/25 transition-all duration-300 ${isCollapsed && !isMobile ? 'lg:w-14 lg:h-14' : 'w-16 h-16'} relative overflow-hidden`}>
                <img 
                  src="/logo.svg" 
                  alt="ResumeIQ" 
                  className={`w-full h-full object-contain filter brightness-0 invert dark:brightness-0 relative z-10`} 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75"
              />
            </motion.div>
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`${!isMobile ? 'hidden lg:block' : ''}`}
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                  ResumeIQ
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">AI-Powered Analysis</p>
              </motion.div>
            )}
            
            {/* Collapse toggle - desktop only */}
            {!isMobile && (
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={onToggleCollapse}
                className="hidden lg:flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
              >
                <motion.div
                  animate={{ rotate: isCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="relative z-10 p-4 border-b border-gray-200 dark:border-purple-500/20">
          <div className={`flex items-center gap-4 ${isCollapsed && !isMobile ? 'lg:justify-center' : ''}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/25 transition-all duration-300 ${isCollapsed && !isMobile ? 'lg:w-10 lg:h-10' : ''} relative overflow-hidden`}>
                <span className="relative z-10">
                  {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black/40"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`${!isMobile ? 'hidden lg:block' : ''} flex-1 min-w-0`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <p className="font-semibold text-gray-900 dark:text-white truncate">
                    {user?.name || 'User'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || ''}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.5 }}
              >
                {item.isLogout ? (
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className={`w-full flex items-center ${isCollapsed && !isMobile ? 'lg:justify-center' : 'justify-start'} gap-4 px-4 py-3.5 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group border border-transparent hover:border-red-500/30 backdrop-blur-sm`}
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-red-500/20 group-hover:bg-red-500/30 transition-colors flex-shrink-0 relative overflow-hidden">
                      <Icon className="w-5 h-5 relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {(!isCollapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-semibold text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </motion.button>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                        relative w-full flex items-center ${isCollapsed && !isMobile ? 'lg:justify-center' : 'justify-start'} gap-4 px-4 py-3.5 rounded-2xl
                        transition-all duration-300 group overflow-hidden backdrop-blur-sm
                        ${
                          isActive
                            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-purple-500/25 border border-white/20`
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white border border-transparent hover:border-purple-500/30'
                        }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                          isActive 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20'
                        } transition-all duration-300`}>
                          <Icon className={`w-5 h-5 transition-all duration-300 relative z-10 ${
                            isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200'
                          }`} />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {(!isCollapsed || isMobile) && (
                          <>
                            <motion.span
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className="font-semibold text-sm truncate"
                            >
                              {item.label}
                            </motion.span>
                            {isActive && (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="ml-auto"
                              >
                                <Zap className="w-4 h-4 text-white animate-pulse" />
                              </motion.div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </NavLink>
                )}
              </motion.div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};

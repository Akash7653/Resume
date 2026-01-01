import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Rocket } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 dark:bg-black/40 backdrop-blur-2xl border-b border-gray-200 dark:border-purple-500/20 shadow-2xl py-3'
          : 'bg-transparent py-4'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4 cursor-pointer group" 
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <motion.img 
                src="/logo.svg" 
                alt="ResumeIQ" 
                className="w-10 h-10 filter dark:brightness-0 invert"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping opacity-75"
              />
            </div>
            <motion.span 
              className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              ResumeIQ
            </motion.span>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-6">
            {[
              { name: 'Features' },
              { name: 'Why Resume Matters' },
              { name: 'How It Works' },
              { name: 'Companies' },
              { name: 'Testimonials' },
              { name: 'Pricing' }
            ].map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.name.toLowerCase().replace(' ', '-'))}
                className="relative group text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-300 py-2"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <div className="ml-6 pl-6 border-l border-purple-500/30 flex items-center">
              <ThemeToggle size="sm" />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/login" className="inline-flex items-center justify-center px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-300 border border-gray-200 dark:border-white/20 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/40 relative overflow-hidden group">
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/register" className="inline-flex items-center justify-center px-6 py-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 animate-pulse opacity-50 rounded-xl" />
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
            
            {/* Theme Toggle for mobile */}
            <div className="lg:hidden ml-4 pl-4 border-l border-gray-200 dark:border-white/20 flex items-center">
              <ThemeToggle size="sm" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">
              {isOpen ? <X className="w-6 h-6 text-gray-600 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-600 dark:text-white" />}
            </span>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 pb-4 space-y-2 overflow-hidden"
            >
              {[
                { name: 'Features' },
                { name: 'Why Resume Matters' },
                { name: 'How It Works' },
                { name: 'Companies' },
                { name: 'Testimonials' },
                { name: 'Pricing' }
              ].map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.name.toLowerCase().replace(' ', '-'))}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-purple-500/30"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4 space-y-3 border-t border-gray-200 dark:border-purple-500/30"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/login" className="inline-flex items-center justify-center w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 rounded-xl transition-all duration-300 border border-gray-200 dark:border-white/20 text-center font-medium">
                    Sign In
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/register" className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

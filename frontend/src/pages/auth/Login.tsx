import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles, Mail, Lock, Eye, EyeOff, Chrome, Shield, Brain, Target, Rocket, Star, Globe, Fingerprint, Key, Zap, Wifi, Cpu, Database, Cloud, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  // 3D mouse tracking with enhanced effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Dynamic glow intensity based on mouse proximity
        const distance = Math.sqrt(x * x + y * y);
        setGlowIntensity(Math.max(0, 1 - distance * 2));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSocialLoading(null);
    navigate('/dashboard');
  };

  const features = [
    { icon: Brain, title: 'AI-Powered Analysis', desc: 'Advanced ATS scoring and optimization', color: 'from-purple-500 to-pink-500', stats: '99% Accuracy' },
    { icon: ShieldCheck, title: 'Enterprise Security', desc: 'Bank-level encryption and protection', color: 'from-blue-500 to-cyan-500', stats: '256-bit SSL' },
    { icon: Rocket, title: 'Career Acceleration', desc: 'Data-driven career recommendations', color: 'from-green-500 to-emerald-500', stats: '10x Faster' },
    { icon: Cloud, title: 'Cloud Storage', desc: 'Unlimited resume backups and sync', color: 'from-orange-500 to-red-500', stats: '∞ Storage' }
  ];

  const techStack = [
    { icon: Cpu, name: 'AI Processing' },
    { icon: Database, name: 'Secure Database' },
    { icon: Wifi, name: 'Real-time Sync' },
    { icon: Zap, name: 'Lightning Fast' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Advanced animated background with multiple layers */}
      <div className="absolute inset-0">
        {/* Layer 1: Neural network animation */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {[...Array(20)].map((_, i) => (
            <motion.circle
              key={i}
              cx={`${Math.random() * 100}%`}
              cy={`${Math.random() * 100}%`}
              r="2"
              fill="url(#gradient)"
              filter="url(#glow)"
              animate={{
                cx: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                cy: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>

        {/* Layer 2: Floating geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-purple-500/20 rounded-lg backdrop-blur-sm"
            style={{
              width: `${40 + Math.random() * 80}px`,
              height: `${40 + Math.random() * 80}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Layer 3: Advanced particle system */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${139 + Math.random() * 116}, ${92 + Math.random() * 163}, ${246 + Math.random() * 9}, 0.8) 0%, transparent 70%)`
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.random() * 100 - 50, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Layer 4: Dynamic glow effect following mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            opacity: glowIntensity
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-7xl z-10"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
      >
        <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden grid lg:grid-cols-3">
          {/* LEFT SIDE - Ultra Premium Welcome Section */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-cyan-900/50 relative overflow-hidden">
            {/* Animated holographic overlay */}
            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-slide"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 animate-spin" style={{ animationDuration: '20s' }}></div>
            </div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="inline-flex items-center justify-center w-40 h-40 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-8 relative"
              >
                <Sparkles className="w-20 h-20 text-white" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-spin opacity-20" style={{ animationDuration: '10s' }}></div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                className="text-7xl font-bold text-white mb-4 leading-tight"
              >
                Welcome
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Back</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="text-gray-300 text-xl leading-relaxed mb-12"
              >
                Step into the future of career development with our AI-powered resume optimization platform
              </motion.p>

              {/* Interactive Features Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                className="space-y-6 mb-12"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.15 }}
                      onHoverStart={() => setActiveFeature(index)}
                      onHoverEnd={() => setActiveFeature(null)}
                      className={`relative p-6 rounded-2xl border transition-all cursor-pointer ${
                        activeFeature === index 
                          ? 'bg-white/10 border-purple-400 scale-105 shadow-2xl shadow-purple-500/30' 
                          : 'bg-white/5 border-white/10 hover:border-purple-400/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            animate={{
                              rotate: activeFeature === index ? 360 : 0,
                              scale: activeFeature === index ? 1.2 : 1
                            }}
                            transition={{ duration: 0.3 }}
                            className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-white text-lg mb-1">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{feature.stats}</div>
                        </div>
                      </div>
                      
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl -z-10"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Tech Stack */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
                className="grid grid-cols-2 gap-4"
              >
                {techStack.map((tech, index) => {
                  const Icon = tech.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <Icon className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300 text-sm">{tech.name}</span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE - Ultra Premium Login Form */}
          <div className="lg:col-span-2 p-12 flex flex-col justify-center relative bg-black/20">
            {/* Logo for mobile */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping opacity-75"></div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-6xl font-bold text-white mb-2">
                Sign In
              </h2>
              <p className="text-gray-400 mb-12 text-lg">
                Access your AI-powered career dashboard
              </p>

              {/* Biometric Login Options */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-3 gap-4 mb-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
                >
                  <Fingerprint className="w-6 h-6 text-purple-400 mx-auto mb-2 group-hover:text-purple-300 transition-colors" />
                  <span className="text-xs text-gray-300">Fingerprint</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
                >
                  <Key className="w-6 h-6 text-blue-400 mx-auto mb-2 group-hover:text-blue-300 transition-colors" />
                  <span className="text-xs text-gray-300">Face ID</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
                >
                  <Shield className="w-6 h-6 text-cyan-400 mx-auto mb-2 group-hover:text-cyan-300 transition-colors" />
                  <span className="text-xs text-gray-300">Security</span>
                </motion.button>
              </motion.div>

              {/* Social Login */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="space-y-4 mb-8"
              >
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={!!socialLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all group"
                >
                  {socialLoading === 'google' ? (
                    <div className="w-5 h-5 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                  ) : (
                    <Chrome className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors" />
                  )}
                  <span className="text-white font-medium">
                    {socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}
                  </span>
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/20"></div>
                  <span className="text-gray-400 text-sm font-medium">OR</span>
                  <div className="flex-1 h-px bg-white/20"></div>
                </div>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-red-500 rounded-full"
                    ></motion.div>
                    <span className="text-red-400 text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all group-hover:bg-white/10 group-hover:border-purple-400/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all group-hover:bg-white/10 group-hover:border-purple-400/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 group-hover:text-purple-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 group-hover:text-purple-400 transition-colors" />
                      )}
                    </button>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="flex justify-between items-center"
                >
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="w-5 h-5 text-purple-500 border-white/20 rounded focus:ring-purple-500 bg-white/5" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-pulse opacity-50"></div>
                  {loading ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Sign In</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="mt-6 text-center"
              >
                <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm transition-colors inline-flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Home
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth.ts';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Form validation
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter an email');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register({ name, email, password });
      setSuccess('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
                <FileText className="w-20 h-20 text-white" />
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
                Create
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Account</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                className="text-gray-300 text-xl leading-relaxed mb-12"
              >
                Join thousands of professionals transforming their careers with AI-powered resume optimization
              </motion.p>

              {/* Interactive Premium Features Grid */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
                className="space-y-6 mb-12"
              >
                {premiumFeatures.map((feature, index) => {
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
                            className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center relative`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                            <div className="absolute -top-2 -right-2 px-2 py-1 bg-white/90 rounded-full">
                              <span className="text-xs font-bold text-gray-800">{feature.badge}</span>
                            </div>
                          </motion.div>
                          <div>
                            <h3 className="font-bold text-white text-lg mb-1">{feature.title}</h3>
                            <p className="text-gray-400 text-sm">{feature.desc}</p>
                          </div>
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
            </div>
          </div>

          {/* RIGHT SIDE - Ultra Premium Register Form */}
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
                  <FileText className="w-10 h-10 text-white" />
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
                Sign Up
              </h2>
              <p className="text-gray-400 mb-12 text-lg">
                Create your account and start optimizing your resume
              </p>

              {/* Social Signup Options */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="space-y-4 mb-8"
              >
                <button
                  onClick={() => handleSocialSignup('google')}
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

              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center space-x-3"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    ></motion.div>
                    <span className="text-green-400 text-sm">{success}</span>
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
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all group-hover:bg-white/10 group-hover:border-purple-400/50"
                      required
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
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
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
                      placeholder="Create a strong password"
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all group-hover:bg-white/10 group-hover:border-purple-400/50"
                      required
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
                  {password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Password strength</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.score <= 2 ? 'text-red-400' : 
                          passwordStrength.score <= 3 ? 'text-emerald-400' : 'text-green-400'
                        }`}>
                          {passwordStrength.text}
                        </span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={`w-full pl-12 pr-16 py-4 bg-white/5 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all group-hover:bg-white/10 ${
                        confirmPassword && password !== confirmPassword 
                          ? 'border-red-500 focus:ring-red-500' 
                          : confirmPassword && password === confirmPassword
                          ? 'border-green-500 focus:ring-green-500'
                          : 'border-white/20 group-hover:border-purple-400/50'
                      }`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 group-hover:text-purple-400 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 group-hover:text-purple-400 transition-colors" />
                      )}
                    </button>
                    {confirmPassword && (
                      <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                        {password === confirmPassword ? (
                          <CheckCircle className="text-green-400" size={20} />
                        ) : (
                          <XCircle className="text-red-400" size={20} />
                        )}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p className="text-red-400 text-xs mt-2">Passwords do not match</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="flex items-start space-x-3"
                >
                  <div className="relative mt-1">
                    <input type="checkbox" className="w-5 h-5 text-purple-500 border-white/20 rounded focus:ring-purple-500 bg-white/5" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded opacity-0 hover:opacity-20 transition-opacity"></div>
                  </div>
                  <span className="text-sm text-gray-400 leading-relaxed">
                    I agree to the{' '}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                      Privacy Policy
                    </Link>
                  </span>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={loading || !!success}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-pulse opacity-50"></div>
                  {loading ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating account...
                    </div>
                  ) : success ? (
                    <span className="relative z-10">Success! 🎉</span>
                  ) : (
                    <>
                      <span className="relative z-10">Create Account</span>
                      <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="mt-12 text-center"
              >
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Sign in
                  </Link>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
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

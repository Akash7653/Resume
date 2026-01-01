import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Zap, Crown, Sparkles, Loader2, ArrowLeft, Shield, Rocket, Star, TrendingUp, Gift } from 'lucide-react';
import { PaymentForm } from '../../components/payment/PaymentForm';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export const PricingTest: React.FC = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<string>('free'); // free, pro, premium
  const [uploadCount, setUploadCount] = useState<number>(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);

  const FREE_UPLOAD_LIMIT = 10;

  // Check if user has reached upload limit
  const hasReachedLimit = userPlan === 'free' && uploadCount >= FREE_UPLOAD_LIMIT;

  // Simulate user authentication (in real app, check actual auth state)
  const isLoggedIn = true; // For demo, assume logged in

  useEffect(() => {
    // In real app, fetch user data from backend
    // For demo, simulate user data
    const savedPlan = localStorage.getItem('userPlan') || 'free';
    const savedUploadCount = parseInt(localStorage.getItem('uploadCount') || '0');
    setUserPlan(savedPlan);
    setUploadCount(savedUploadCount);
  }, []);

  const incrementUploadCount = () => {
    if (userPlan === 'free') {
      const newCount = uploadCount + 1;
      setUploadCount(newCount);
      localStorage.setItem('uploadCount', newCount.toString());
    }
  };

  const plans = [
    {
      name: 'Free',
      icon: Gift,
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        '10 Resume uploads',
        'Basic ATS score checking',
        'PDF export',
        'Email support',
        'Keyword analysis',
        'Formatting suggestions'
      ],
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-500/10 to-emerald-500/10',
      buttonText: hasReachedLimit ? 'Upgrade Required' : 'Get Started Free',
      popular: false,
      isFree: true,
      disabled: hasReachedLimit,
      badge: 'FREE',
    },
    {
      name: 'Pro',
      icon: Zap,
      price: '$19.99',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited Resume uploads',
        'Advanced ATS analysis',
        'AI resume rewrite',
        'Job description matching',
        'Priority support',
        'Multiple format exports',
        'Cover letter templates',
        'Interview preparation tips'
      ],
      color: 'from-blue-600 via-purple-600 to-pink-600',
      bgColor: 'from-blue-500/10 to-purple-500/10',
      buttonText: 'Go Pro',
      popular: true,
      isFree: false,
      disabled: false,
      badge: 'POPULAR',
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '$49.99',
      description: 'For serious career growth',
      features: [
        'Everything in Pro',
        '1-on-1 coaching session',
        'Custom resume templates',
        'Dedicated account manager',
        'LinkedIn optimization',
        'White-glove service'
      ],
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
      buttonText: 'Go Premium',
      popular: false,
      isFree: false,
      disabled: false,
      badge: 'PREMIUM',
    },
  ];

  const handleSelectPlan = async (planName: string) => {
    const plan = plans.find(p => p.name === planName);
    
    // Handle free plan with limit reached
    if (plan?.isFree && hasReachedLimit) {
      alert('You have reached your 10 upload limit. Please upgrade to continue.');
      return;
    }
    
    // For paid plans, show payment form
    if (!plan?.isFree) {
      if (!plan) {
        console.error('Plan not found:', planName);
        alert('Invalid plan selected. Please try again.');
        return;
      }
      setSelectedPlan({ name: plan.name, price: plan.price });
      setShowPaymentForm(true);
      return;
    }
    
    // For free plan (within limit), redirect to upload page
    setLoadingPlan(planName);
    
    try {
      // Simulate free plan activation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user plan
      setUserPlan('free');
      localStorage.setItem('userPlan', 'free');
      
      // Redirect to upload page
      window.location.href = '/upload';
    } catch (error) {
      console.error('Plan activation error:', error);
      alert('Failed to activate plan. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePaymentSuccess = () => {
    // Update user plan after successful payment
    if (selectedPlan) {
      setUserPlan(selectedPlan.name.toLowerCase());
      localStorage.setItem('userPlan', selectedPlan.name.toLowerCase());
      localStorage.setItem('uploadCount', '0'); // Reset upload count for paid plans
      setUploadCount(0);
    }
    
    setShowPaymentForm(false);
    setSelectedPlan(null);
    
    // Redirect to upload page after successful payment
    window.location.href = '/upload';
  };

  const handlePaymentCancel = () => {
    setShowPaymentForm(false);
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Advanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural network animation */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20">
          <defs>
            <linearGradient id="pricingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="pricingGlow">
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
              fill="url(#pricingGradient)"
              filter="url(#pricingGlow)"
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

        {/* Floating geometric shapes */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-purple-500/10 dark:border-purple-500/20 rounded-lg backdrop-blur-sm"
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

        {/* Advanced particle system */}
        {[...Array(70)].map((_, i) => (
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
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Back to Dashboard Button */}
          <div className="mb-8">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/dashboard'}
              className="inline-flex items-center px-6 py-3 text-gray-300 hover:text-white font-medium transition-all duration-300 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-400/50 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </motion.button>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Unlock the full potential of your resume with our AI-powered tools. 
            Start free, upgrade when you're ready to accelerate your career.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative group ${plan.popular ? 'scale-105' : ''} transition-all duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.2 }}
                    className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-500/25 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                      <span className="relative z-10 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        {plan.badge}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Pricing Card */}
                <div className={`bg-white/90 dark:bg-black/40 backdrop-blur-2xl rounded-3xl border border-gray-200 dark:border-purple-500/20 hover:border-purple-400/40 p-8 h-full relative overflow-hidden group ${plan.popular ? 'ring-2 ring-purple-500/50 shadow-2xl shadow-purple-500/20' : 'shadow-xl'}`}>
                  {/* Animated background effects */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgColor} opacity-30`}></div>
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${15 + i * 25}%`,
                          top: `${15 + i * 25}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Plan Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${plan.color} rounded-full mb-6 relative overflow-hidden shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                      <motion.div
                        className="absolute -top-1 -right-1 w-4 h-4 bg-white/50 rounded-full"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Plan Badge */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        plan.badge === 'FREE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        plan.badge === 'POPULAR' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {plan.badge}
                      </span>
                    </div>

                    {/* Plan Name */}
                    <motion.h3 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-3xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                      {plan.name}
                    </motion.h3>
                    
                    {/* Plan Description */}
                    <motion.p 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-gray-600 dark:text-gray-400 mb-6"
                    >
                      {plan.description}
                    </motion.p>

                    {/* Price */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-8"
                    >
                      <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 dark:from-white to-gray-700 dark:to-gray-300 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 text-lg ml-2">
                        /month
                      </span>
                    </motion.div>

                    {/* Features List */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-4 mb-8"
                    >
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + featureIndex * 0.1 }}
                          className="flex items-start space-x-3 group"
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-green-500/25"
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                          <span className="text-gray-700 dark:text-gray-300 text-sm group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={() => handleSelectPlan(plan.name)}
                      disabled={loadingPlan === plan.name || plan.disabled}
                      className={`w-full py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 text-white shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                          : plan.disabled
                          ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed border border-gray-600/50'
                          : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                      {loadingPlan === plan.name ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin relative z-10" />
                          <span className="relative z-10">Processing...</span>
                        </>
                      ) : (
                        <span className="relative z-10 flex items-center gap-2">
                          {plan.buttonText}
                          <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </motion.button>
                  </div>

                  {/* Decorative corner elements */}
                  <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-purple-500/20 rounded-tr-2xl"></div>
                  <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-purple-500/20 rounded-bl-2xl"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Features Comparison */}
        <div className="bg-bg-surface/60 backdrop-blur-lg rounded-3xl p-8 border border-border-subtle max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Compare Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-text-primary mb-4">Basic</h3>
              <p className="text-text-secondary text-sm">Essential features to get started</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-text-primary mb-4">Pro</h3>
              <p className="text-text-secondary text-sm">Advanced tools for serious job seekers</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-text-primary mb-4">Premium</h3>
              <p className="text-text-secondary text-sm">Complete career transformation package</p>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-accent-green/10 to-accent-emerald/10 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              30-Day Money Back Guarantee
            </h3>
            <p className="text-text-secondary mb-6">
              Not satisfied? Get a full refund within 30 days, no questions asked.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-text-muted">
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Cancel Anytime</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>No Hidden Fees</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Secure Payment</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedPlan && (
        <PaymentForm
          planName={selectedPlan.name}
          price={selectedPlan.price}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};

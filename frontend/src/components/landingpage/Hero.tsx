import { Link } from 'react-router-dom';
import { Play, Shield, Zap, Target, TrendingUp, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent-blue/10 via-accent-purple/10 to-accent-pink/10 pt-20 theme-transition">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-400/30 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-purple-400/30 rounded-full blur-3xl top-1/3 -right-48 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl -bottom-48 left-1/3 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Dark mode floating elements */}
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-48 -left-48 animate-float hidden dark:block"></div>
        <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl top-1/3 -right-48 animate-float hidden dark:block" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 bg-pink-600/20 rounded-full blur-3xl -bottom-48 left-1/3 animate-float hidden dark:block" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-bg-surface/80 backdrop-blur-sm rounded-full shadow-lg">
              <Zap className="w-4 h-4 text-accent-emerald" />
              <span className="text-sm font-semibold text-text-primary">AI-Powered Resume Analysis</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
              Your Resume Is the{' '}
              <span className="text-gradient">
                First Interview
              </span>{' '}
              — Make It Perfect with AI
            </h1>

            <p className="text-xl text-text-secondary leading-relaxed max-w-2xl">
              Transform your resume from invisible to irresistible. Our AI analyzes, optimizes, and tailors your resume to beat ATS systems and land more interviews.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse rounded-xl font-bold text-lg btn-glow hover:scale-105 transition-all shadow-2xl text-center">
                Start Free Analysis
              </Link>
              <button className="px-8 py-4 bg-bg-surface/90 backdrop-blur-sm text-text-primary rounded-xl font-bold text-lg hover:bg-bg-surface hover:shadow-xl transition-all flex items-center justify-center space-x-2 border border-border-medium">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent-green/20 rounded-lg">
                  <Shield className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">ATS Friendly</p>
                  <p className="text-xs text-text-muted">95% Pass Rate</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent-blue/20 rounded-lg">
                  <Zap className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">AI Powered</p>
                  <p className="text-xs text-text-muted">Smart Analysis</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent-purple/20 rounded-lg">
                  <Target className="w-5 h-5 text-accent-purple" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Recruiter Approved</p>
                  <p className="text-xs text-text-muted">Industry Standard</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative glass p-8 rounded-3xl shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-text-primary">Resume Analysis</h3>
                  <span className="px-3 py-1 bg-accent-green/20 text-accent-green text-sm font-semibold rounded-full">Live</span>
                </div>

                <div className="relative pt-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${(85 * 502.4) / 100} 502.4`}
                          strokeLinecap="round"
                          className="transition-all duration-1000"
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
                        <span className="text-5xl font-bold text-gradient">85</span>
                        <span className="text-sm text-text-muted font-medium">ATS Score</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="p-4 bg-gradient-to-br from-accent-blue/10 to-accent-blue/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-accent-blue mb-2" />
                    <p className="text-2xl font-bold text-text-primary">+78%</p>
                    <p className="text-xs text-text-secondary">Interview Rate</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-accent-purple/10 to-accent-purple/20 rounded-xl">
                    <Star className="w-6 h-6 text-accent-purple mb-2" />
                    <p className="text-2xl font-bold text-text-primary">4.9</p>
                    <p className="text-xs text-text-secondary">User Rating</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between p-3 bg-accent-green/10 border border-accent-green/20 rounded-lg">
                    <span className="text-sm font-medium text-text-primary">Keywords Matched</span>
                    <span className="text-sm font-bold text-accent-green">18/20</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent-emerald/10 border border-accent-emerald/20 rounded-lg">
                    <span className="text-sm font-medium text-text-primary">Action Verbs</span>
                    <span className="text-sm font-bold text-accent-emerald">Good</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                    <span className="text-sm font-medium text-text-primary">Formatting</span>
                    <span className="text-sm font-bold text-accent-blue">Excellent</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

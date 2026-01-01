import { Link } from 'react-router-dom';
import { Rocket, ArrowRight, Shield } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute w-96 h-96 bg-text-inverse/20 rounded-full blur-3xl -top-48 -left-48 animate-float"></div>
        <div className="absolute w-96 h-96 bg-text-inverse/20 rounded-full blur-3xl top-1/3 -right-48 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute w-96 h-96 bg-text-inverse/20 rounded-full blur-3xl -bottom-48 left-1/3 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-text-inverse/20 backdrop-blur-sm rounded-full mb-8 animate-pulse">
          <Rocket className="w-10 h-10 text-text-inverse" />
        </div>

        <h2 className="text-5xl md:text-6xl font-extrabold text-text-inverse mb-6 leading-tight">
          Your Career Deserves More Than a Generic Resume
        </h2>

        <p className="text-xl md:text-2xl text-text-inverse/90 mb-4 max-w-3xl mx-auto leading-relaxed">
          Stop letting your resume hold you back. Join 100,000+ professionals who transformed their job search with AI.
        </p>

        <p className="text-lg text-text-inverse/80 mb-12 max-w-2xl mx-auto">
          Get instant ATS analysis, AI-powered suggestions, and land more interviews. Start free, no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/register" className="px-10 py-5 bg-bg-surface text-accent-purple rounded-xl font-bold text-lg hover:bg-bg-secondary transition-all shadow-2xl hover:scale-105 hover:shadow-3xl flex items-center space-x-2 group text-center">
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-10 py-5 bg-text-inverse/10 backdrop-blur-sm text-text-inverse rounded-xl font-bold text-lg hover:bg-text-inverse/20 transition-all border-2 border-text-inverse/30 hover:border-text-inverse/50">
            Watch Demo
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-text-inverse">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Free Forever Plan</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">No Credit Card</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <span className="font-semibold">Instant Results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

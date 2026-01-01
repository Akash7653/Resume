import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Start free, upgrade when you're ready to unlock advanced features
          </p>
        </div>

        {/* Simple Register CTA */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-bg-surface rounded-2xl shadow-lg border border-border-medium p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2zm2 8a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6z" clipRule="evenodd" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              View Our Pricing Plans
            </h3>
            
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              Register to see our detailed pricing options and choose the perfect plan for your career growth.
            </p>
            
            <div className="space-y-4">
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-text-inverse font-semibold rounded-xl hover:from-accent-blue/90 hover:to-accent-purple/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Register to View Plans
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <p className="text-sm text-text-muted">
                Free to sign up • No credit card required
              </p>
            </div>
          </div>
        </div>

        {/* Link to detailed pricing page */}
        <div className="text-center mt-12">
          <p className="text-text-secondary mb-4">
            Already have an account?
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center text-accent-blue hover:text-accent-purple font-medium"
          >
            View Pricing Plans
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

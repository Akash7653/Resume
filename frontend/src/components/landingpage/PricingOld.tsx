import { Link } from 'react-router-dom';
import { Check, Zap, Crown, Sparkles } from 'lucide-react';

export default function Pricing() {
  
  const plans = [
    {
      name: 'Free',
      icon: Sparkles,
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        '10 Resume uploads',
        'Basic ATS score checking',
        'PDF export',
        'Email support',
        'Keyword Analysis',
        'Formatting suggestions',
      ],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      buttonText: 'Get Started Free',
      popular: false,
      planId: 'free',
    },
    {
      name: 'Pro',
      icon: Zap,
      price: '19.99',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited Resume uploads',
        'Advanced ATS analysis',
        'AI resume rewrite',
        'Job description matching',
        'Priority support',
        'Multiple format exports',
      ],
      color: 'from-blue-600 via-purple-600 to-pink-600',
      bgColor: 'from-blue-50 to-purple-50',
      buttonText: 'Go Pro',
      popular: true,
      planId: 'pro',
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '49.99',
      description: 'For serious career growth',
      features: [
        'Everything in Pro',
        '1-on-1 coaching session',
        'Custom resume templates',
        'Dedicated account manager',
        'LinkedIn optimization',
        'White-glove service',
      ],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      buttonText: 'Go Premium',
      popular: false,
      planId: 'premium',
    },
  ];

  const handlePlanClick = (planId: string) => {
    // For landing page, always redirect to authentication first
    window.location.href = '/register';
  };
      price: '19.99',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited Resume analyses',
        'Advanced AI suggestions',
        'Multiple format exports',
        'Priority support',
        'Job description matching',
        'AI Resume Rewrite',
        'Version History',
        'Cover Letter Generator',
      ],
      color: 'from-blue-600 via-purple-600 to-pink-600',
      bgColor: 'from-blue-50 to-purple-50',
      buttonText: 'Start Pro Trial',
      popular: true,
      planId: 'pro',
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '49.99',
      description: 'For serious career growth',
      features: [
        'Everything in Pro',
        '1-on-1 coaching session',
        'Custom resume templates',
        'LinkedIn optimization',
        'Interview preparation',
        'Dedicated account manager',
        'Salary negotiation guide',
        'Industry-specific templates',
        'White-glove service',
      ],
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      buttonText: 'Go Premium',
      popular: false,
      planId: 'premium',
    },
  ];

  const handleSelectPlan = async (planId: string) => {
    try {
      // Map plan to price ID (you'll need to configure these in Stripe)
      const priceMap: Record<string, string> = {
        basic: 'price_basic_id_here',
        pro: 'price_pro_id_here',
        premium: 'price_premium_id_here'
      };
      
      await createCheckoutSession(priceMap[planId]);
    } catch (error) {
      console.error('Payment failed:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <section id="pricing" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold mb-6">
            Choose Your{' '}
            <span className="text-gradient from-blue-600 via-purple-600 to-pink-600">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Start free, upgrade when you need more. Cancel anytime, no questions asked.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-bg-surface rounded-3xl shadow-xl hover:shadow-2xl transition-all card-hover border-2 ${
                plan.popular ? 'border-accent-purple relative' : 'border-border-subtle'
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-6 py-2 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse text-sm font-bold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <plan.icon className="w-8 h-8 text-text-inverse" />
              </div>

              <h3 className="text-3xl font-extrabold text-text-primary mb-2">{plan.name}</h3>
              <p className="text-text-secondary mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-extrabold text-text-primary">${plan.price}</span>
                <span className="text-text-secondary text-lg">/month</span>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.planId)}
                disabled={isProcessing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all mb-8 text-center block ${
                  plan.popular
                    ? 'bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse btn-glow hover:scale-105 shadow-2xl'
                    : 'bg-bg-surface text-text-primary hover:bg-bg-secondary shadow-lg hover:shadow-xl'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isProcessing ? 'Processing...' : plan.buttonText}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-accent-purple' : 'text-text-muted'}`} />
                    <span className="text-text-primary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-4">All plans include 7-day money-back guarantee</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-muted mb-8">
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent-green" />
              <span>Cancel Anytime</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent-green" />
              <span>No Hidden Fees</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent-green" />
              <span>Secure Payment</span>
            </span>
            <span className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-accent-green" />
              <span>24/7 Support</span>
            </span>
          </div>
          <Link
            to="/pricing"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-text-inverse font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
          >
            View Detailed Pricing
            <Zap className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

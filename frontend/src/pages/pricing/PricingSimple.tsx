import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { PageHero } from '../../components/ui/PageHero';

export const PricingSimple: React.FC = () => {
  // Map plan to price ID (replace with your actual Stripe price IDs)
  const priceMap: Record<string, string> = {
    basic: 'price_1Oxxxxxxx',    // Replace with actual Basic price ID
    pro: 'price_1Oxxxxxxx',     // Replace with actual Pro price ID
    premium: 'price_1Oxxxxxxx'  // Replace with actual Premium price ID
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      description: 'Perfect for getting started',
      features: [
        '5 Resume analyses per month',
        'Basic AI suggestions',
        'PDF export',
        'Email support'
      ]
    },
    {
      name: 'Pro',
      price: '$19.99',
      description: 'Most popular for job seekers',
      features: [
        'Unlimited Resume analyses',
        'Advanced AI suggestions',
        'Multiple format exports',
        'Priority support'
      ]
    },
    {
      name: 'Premium',
      price: '$49.99',
      description: 'For serious career growth',
      features: [
        'Everything in Pro',
        '1-on-1 coaching session',
        'Custom resume templates',
        'Dedicated account manager'
      ]
    }
  ];

  return (
    <PageWrapper>
      <div className="space-y-16">
        {/* Hero Section */}
        <PageHero
          title="Choose Your Plan"
          subtitle="Unlock the full potential of your resume with our AI-powered tools"
          icon={CreditCard}
        />

        {/* Pricing Cards */}
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-slate-700"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 text-lg">
                      /month
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`${plan.name} plan selected! Payment integration coming soon.`)}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get {plan.name}
                </button>

                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            All plans include 7-day money-back guarantee
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
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
    </PageWrapper>
  );
};

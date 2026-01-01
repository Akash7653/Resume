import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { PageHero } from '../../components/ui/PageHero';
import { PricingCard } from '../../components/payment/PricingCard';
import { usePayment } from '../../context/PaymentContext';

export const Pricing: React.FC = () => {
  const { createCheckoutSession, isProcessing } = usePayment();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = async (plan: string) => {
    setSelectedPlan(plan);
    
    try {
      // Map plan to price ID (you'll need to configure these in Stripe)
      const priceMap: Record<string, string> = {
        basic: 'price_basic_id_here',
        pro: 'price_pro_id_here',
        premium: 'price_premium_id_here'
      };
      
      await createCheckoutSession(priceMap[plan]);
    } catch (error) {
      console.error('Payment failed:', error);
      // TODO: Show error message to user
    } finally {
      setSelectedPlan(null);
    }
  };

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
            <PricingCard
              plan="basic"
              onSelectPlan={handleSelectPlan}
              isProcessing={isProcessing && selectedPlan === 'basic'}
            />
            
            <PricingCard
              plan="pro"
              isPopular={true}
              onSelectPlan={handleSelectPlan}
              isProcessing={isProcessing && selectedPlan === 'pro'}
            />
            
            <PricingCard
              plan="premium"
              onSelectPlan={handleSelectPlan}
              isProcessing={isProcessing && selectedPlan === 'premium'}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Got questions? We've got answers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! All plans come with a 7-day free trial. You can cancel anytime without any charges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment system.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Is my data secure?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! We use industry-standard encryption and never share your personal information with third parties.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

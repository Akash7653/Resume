import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '../ui/Button';

interface PricingCardProps {
  plan: keyof typeof import('../../config/stripe').STRIPE_CONFIG.PLANS;
  isPopular?: boolean;
  onSelectPlan: (plan: string) => void;
  isProcessing?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ 
  plan, 
  isPopular = false, 
  onSelectPlan, 
  isProcessing = false 
}) => {
  const { STRIPE_CONFIG } = require('../../config/stripe');
  const planData = STRIPE_CONFIG.PLANS[plan];

  const getIcon = () => {
    switch (plan) {
      case 'basic':
        return <Star className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      case 'premium':
        return <Crown className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`relative rounded-2xl p-8 ${
        isPopular 
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl' 
          : 'bg-white dark:bg-slate-800 shadow-lg'
      }`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          isPopular ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900'
        }`}>
          {getIcon()}
        </div>
        
        <h3 className={`text-2xl font-bold mb-2 ${
          isPopular ? 'text-white' : 'text-gray-900 dark:text-white'
        }`}>
          {planData.name}
        </h3>
        
        <div className="mb-4">
          <span className={`text-4xl font-bold ${
            isPopular ? 'text-white' : 'text-gray-900 dark:text-white'
          }`}>
            {planData.price}
          </span>
          <span className={`text-sm ${
            isPopular ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'
          }`}>
            /month
          </span>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {planData.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-start">
            <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
              isPopular ? 'text-white' : 'text-green-500'
            }`} />
            <span className={`text-sm ${
              isPopular ? 'text-white' : 'text-gray-700 dark:text-gray-300'
            }`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => onSelectPlan(plan)}
        disabled={isProcessing}
        className={`w-full py-3 ${
          isPopular 
            ? 'bg-white text-blue-600 hover:bg-gray-100' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isProcessing ? 'Processing...' : `Get ${planData.name}`}
      </Button>
    </motion.div>
  );
};

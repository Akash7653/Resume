import React from 'react';
import { Zap, Crown, X } from 'lucide-react';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'pro' | 'premium') => void;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            You've Reached Your Free Limit!
          </h2>
          <p className="text-lg text-gray-600">
            You've used all 10 free resume uploads. Upgrade to unlock unlimited uploads and premium features.
          </p>
        </div>

        {/* Upgrade Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Pro Plan */}
          <div className="border border-gray-200 rounded-2xl p-6 hover:border-blue-500 transition-colors">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pro</h3>
                <p className="text-gray-600">$19.99/month</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>✓ Unlimited resume uploads</li>
              <li>✓ Advanced ATS analysis</li>
              <li>✓ AI resume rewrite</li>
              <li>✓ Job description matching</li>
            </ul>
            <button
              onClick={() => onUpgrade('pro')}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border border-gray-200 rounded-2xl p-6 hover:border-yellow-500 transition-colors">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Premium</h3>
                <p className="text-gray-600">$49.99/month</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 mb-4">
              <li>✓ Everything in Pro</li>
              <li>✓ 1-on-1 coaching session</li>
              <li>✓ Custom resume templates</li>
              <li>✓ Dedicated account manager</li>
            </ul>
            <button
              onClick={() => onUpgrade('premium')}
              className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all"
            >
              Go Premium
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>30-day money-back guarantee • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

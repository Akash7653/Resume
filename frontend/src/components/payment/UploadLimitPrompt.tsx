import React from 'react';
import { Zap, Crown, X, AlertCircle } from 'lucide-react';

interface UploadLimitPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  currentUploads: number;
  maxUploads: number;
}

export const UploadLimitPrompt: React.FC<UploadLimitPromptProps> = ({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  currentUploads, 
  maxUploads 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            <AlertCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Upload Limit Reached!
          </h2>
          <p className="text-gray-600">
            You've used all {maxUploads} free uploads. Upgrade to continue uploading resumes.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Usage</span>
              <span className="text-sm text-gray-600">{currentUploads}/{maxUploads}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-red-500 transition-all duration-300"
                style={{ width: `${(currentUploads / maxUploads) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <button
            onClick={onUpgrade}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Upgrade Your Plan
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
          >
            Maybe Later
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>30-day money-back guarantee • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

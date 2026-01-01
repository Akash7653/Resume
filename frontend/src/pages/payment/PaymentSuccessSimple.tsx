import React from 'react';

export const PaymentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 rounded-3xl p-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Thank you for your subscription! You now have access to all premium features.
          </p>

          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>

        <div className="mt-8 bg-blue-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            What's Next?
          </h3>
          <ul className="text-left space-y-2 text-gray-600">
            <li>• Start analyzing your resume with advanced AI</li>
            <li>• Access unlimited resume reports</li>
            <li>• Use job description matching tools</li>
            <li>• Export your resume in multiple formats</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

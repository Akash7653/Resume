export const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-12 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-8 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your subscription! You now have access to all premium features to supercharge your resume.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Go to Dashboard
              </button>
              
              <button
                onClick={() => window.location.href = '/pricing'}
                className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                View Plans
              </button>
            </div>

            {/* Transaction Info */}
            <div className="bg-gray-50 rounded-xl p-4 inline-block">
              <p className="text-sm text-gray-500">
                Transaction ID: demo_session
              </p>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mt-12 bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What's Next?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Advanced AI Analysis</h3>
                    <p className="text-gray-600 text-sm">Get detailed resume insights with our advanced AI</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Unlimited Reports</h3>
                    <p className="text-gray-600 text-sm">Create as many resume reports as you need</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Job Matching</h3>
                    <p className="text-gray-600 text-sm">Match your resume with job descriptions perfectly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Multiple Formats</h3>
                    <p className="text-gray-600 text-sm">Export your resume in PDF, DOCX, and more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Need help? Our support team is here for you.
            </p>
            <div className="flex justify-center space-x-6">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Contact Support
              </button>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

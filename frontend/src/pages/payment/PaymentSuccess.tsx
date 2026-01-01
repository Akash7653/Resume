import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // TODO: Verify the payment session with your backend
    const verifyPayment = async () => {
      if (sessionId) {
        try {
          // Call your backend to verify and update user's subscription
          // await fetch(`/api/payments/verify-session/${sessionId}`);
          console.log('Payment verified for session:', sessionId);
        } catch (error) {
          console.error('Payment verification failed:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (isLoading) {
    return (
      <PageWrapper>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-green-50 dark:bg-green-900/20 rounded-3xl p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Thank you for your subscription! You now have access to all premium features.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Transaction ID: {sessionId}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What's Next?
          </h3>
          <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
            <li>• Start analyzing your resume with advanced AI</li>
            <li>• Access unlimited resume reports</li>
            <li>• Use job description matching tools</li>
            <li>• Export your resume in multiple formats</li>
          </ul>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

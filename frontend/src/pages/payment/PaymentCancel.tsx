import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, Home } from 'lucide-react';
import { PageWrapper } from '../../components/layout/PageWrapper';
import { Button } from '../../components/ui/Button';

export const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-red-500 rounded-full mb-6"
          >
            <XCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Your payment was cancelled. No charges were made to your account.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/pricing')}
                className="flex-1 sm:flex-initial"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                onClick={() => navigate('/dashboard')}
                variant="secondary"
                className="flex-1 sm:flex-initial"
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
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
            Need Help?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you encountered any issues during payment, our support team is here to help.
          </p>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Check your payment details and try again</p>
            <p>• Contact support if the problem persists</p>
            <p>• You can continue using our free features</p>
          </div>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

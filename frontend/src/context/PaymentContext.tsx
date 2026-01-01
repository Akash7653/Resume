import React, { createContext, useContext, useState, ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

interface PaymentContextType {
  stripe: Stripe | null;
  isLoading: boolean;
  createCheckoutSession: (priceId: string) => Promise<void>;
  isProcessing: boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    const initStripe = async () => {
      try {
        const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        
        // Check if the key is a placeholder
        if (!publishableKey || publishableKey.includes('your_publishable_key_here')) {
          console.warn('Stripe publishable key not configured. Using mock mode.');
          setIsLoading(false);
          return;
        }
        
        const stripeInstance = await loadStripe(publishableKey);
        setStripe(stripeInstance);
      } catch (error) {
        console.error('Failed to load Stripe:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initStripe();
  }, []);

  const createCheckoutSession = async (priceId: string) => {
    if (!stripe) {
      // Mock mode - show alert for demo
      alert('Payment integration is not configured. This is a demo mode.\n\nTo enable real payments:\n1. Get Stripe API keys from dashboard.stripe.com\n2. Update frontend/.env with VITE_STRIPE_PUBLISHABLE_KEY\n3. Update backend/.env with STRIPE_SECRET_KEY');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
        }),
      });

      const session = await response.json();

      if (!response.ok) {
        throw new Error(session.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        stripe,
        isLoading,
        createCheckoutSession,
        isProcessing,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

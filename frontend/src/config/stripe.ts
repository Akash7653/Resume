import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const STRIPE_CONFIG = {
  // Prices in cents
  PRICES: {
    BASIC: 999, // $9.99
    PRO: 1999,  // $19.99
    PREMIUM: 4999 // $49.99
  },
  // Features for each plan
  PLANS: {
    basic: {
      name: 'Basic',
      price: '$9.99',
      features: [
        '5 resume analyses per month',
        'Basic AI suggestions',
        'PDF export',
        'Email support'
      ]
    },
    pro: {
      name: 'Pro',
      price: '$19.99',
      features: [
        'Unlimited resume analyses',
        'Advanced AI suggestions',
        'Multiple format exports',
        'Priority support',
        'Job description matching'
      ]
    },
    premium: {
      name: 'Premium',
      price: '$49.99',
      features: [
        'Everything in Pro',
        '1-on-1 coaching session',
        'Custom resume templates',
        'LinkedIn optimization',
        'Interview preparation',
        'Dedicated account manager'
      ]
    }
  }
};

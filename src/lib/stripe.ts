import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-10-29.clover',
  typescript: true,
});

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    features: [
      '100 contacts',
      '50 SMS/month',
      'Basic email campaigns',
      'Community support',
    ],
  },
  STARTER: {
    name: 'Starter',
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID,
    features: [
      '1,000 contacts',
      '500 SMS/month',
      'Email & SMS campaigns',
      'Basic AI chatbot',
      'Email support',
    ],
  },
  PROFESSIONAL: {
    name: 'Professional',
    price: 99,
    priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
    features: [
      '10,000 contacts',
      '2,500 SMS/month',
      'Advanced campaigns',
      'AI chatbot & IVR',
      'Priority support',
      'Custom reports',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 299,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Unlimited contacts',
      'Unlimited SMS',
      'Full platform access',
      'Advanced AI & IVR',
      'Dedicated support',
      'Custom integrations',
      'White-label options',
    ],
  },
};

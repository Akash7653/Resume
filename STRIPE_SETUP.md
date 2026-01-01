# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up Stripe payments for your ResumeIQ application.

## Prerequisites
- Node.js and npm installed
- Python and pip installed
- Stripe account (sign up at https://dashboard.stripe.com/register)

## Step 1: Configure Stripe Dashboard

1. **Sign up for Stripe**: Create an account at https://dashboard.stripe.com
2. **Get API Keys**: Navigate to Developers > API keys
3. **Copy Test Keys**: 
   - Publishable Key: `pk_test_...`
   - Secret Key: `sk_test_...`

## Step 2: Create Products and Prices

1. **Create Products**: In Stripe Dashboard > Products > Add product
2. **Create Three Products**:
   - Basic Plan ($9.99/month)
   - Pro Plan ($19.99/month) 
   - Premium Plan ($49.99/month)

3. **Get Price IDs**: Copy the price IDs (starts with `price_`) for each plan

## Step 3: Environment Configuration

### Frontend (.env)
```bash
# Copy the example file
cp .env.example .env

# Update with your Stripe keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```bash
# Copy the example file  
cp .env.example .env

# Update with your Stripe keys
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
FRONTEND_URL=http://localhost:5173
```

## Step 4: Update Backend Configuration

Edit `backend/app/routes/payments.py` and update the PRICE_IDS:

```python
PRICE_IDS = {
    "basic": "price_YourBasicPriceID",
    "pro": "price_YourProPriceID", 
    "premium": "price_YourPremiumPriceID"
}
```

## Step 5: Start the Development Servers

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Step 6: Test the Payment Flow

1. Navigate to `http://localhost:5173`
2. Login or register
3. Click "Upgrade Plan" in the sidebar
4. Select a plan and click "Get [Plan Name]"
5. You'll be redirected to Stripe Checkout
6. Use test card details:
   - Card number: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
   - Name: Any name

## Step 7: Set Up Webhooks (Optional but Recommended)

1. **Install Stripe CLI**: 
   ```bash
   npm install -g stripe-cli
   ```

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward webhooks**:
   ```bash
   stripe listen --forward-to localhost:8000/api/payments/webhook
   ```

4. **Copy webhook secret** and update your `.env` file

## Features Implemented

✅ **Frontend Components**:
- Payment context and provider
- Pricing cards with animations
- Payment success/cancel pages
- Integration with existing UI

✅ **Backend API**:
- Checkout session creation
- Payment intent creation
- Webhook handling
- Price listing endpoint

✅ **User Experience**:
- Responsive design
- Loading states
- Error handling
- Success/cancel flows

## Security Notes

- Never commit API keys to version control
- Use environment variables for all secrets
- Enable webhook signatures for security
- Test with test keys before using live keys

## Next Steps

1. **Database Integration**: Update webhook handlers to manage user subscriptions
2. **User Dashboard**: Show current subscription status
3. **Usage Limits**: Implement feature restrictions based on plan
4. **Email Notifications**: Send payment receipts and subscription updates
5. **Admin Panel**: Create admin interface for managing subscriptions

## Troubleshooting

**Common Issues**:
- Invalid API keys: Double-check your environment variables
- CORS errors: Ensure frontend URL is in backend CORS settings
- Webhook failures: Verify webhook secret and endpoint URL
- Payment failures: Check Stripe Dashboard for error details

**Debug Mode**:
- Enable Stripe logs: `stripe logs tail`
- Check browser console for frontend errors
- Monitor backend logs for API issues

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Application Issues: Check the GitHub repository issues

# Stripe Products & Prices Setup Guide

## Step 1: Create Products in Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Click on "Products" in the left sidebar
3. Click "Add product" for each plan:

### Basic Plan
- **Name**: Basic Plan
- **Description**: Perfect for getting started
- **Price**: $9.99 USD per month
- **Recurring**: Monthly subscription
- **Copy the Price ID** (starts with `price_...`)

### Pro Plan  
- **Name**: Pro Plan
- **Description**: Most popular for job seekers
- **Price**: $19.99 USD per month
- **Recurring**: Monthly subscription
- **Copy the Price ID** (starts with `price_...`)

### Premium Plan
- **Name**: Premium Plan
- **Description**: For serious career growth
- **Price**: $49.99 USD per month
- **Recurring**: Monthly subscription
- **Copy the Price ID** (starts with `price_...`)

## Step 2: Update Backend Price IDs

Replace the placeholder price IDs in `backend/app/routes/payments.py`:

```python
PRICE_IDS = {
    "basic": "price_BASIC_PRICE_ID_HERE",    # Replace with actual Basic price ID
    "pro": "price_PRO_PRICE_ID_HERE",        # Replace with actual Pro price ID  
    "premium": "price_PREMIUM_PRICE_ID_HERE"  # Replace with actual Premium price ID
}
```

## Step 3: Test Real Payment Flow

1. Click any pricing button
2. Should redirect to **real Stripe Checkout page**
3. Enter test card details: `4242 4242 4242 4242`
4. Complete the payment
5. Redirect to success page

## Test Card Details
- **Card Number**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **Name**: Any name
- **Country**: United States

## What Happens Now
1. User clicks pricing button
2. Backend creates real Stripe checkout session
3. User redirected to Stripe's secure checkout page
4. User enters payment details
5. Stripe processes payment
6. User redirected back to success page

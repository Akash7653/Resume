# Quick Test Guide

## Testing the Payment Integration

### 1. Start the Development Servers

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 2. Test the Payment Flow

1. **Visit the Landing Page**: Go to `http://localhost:5173`
2. **Scroll to Pricing**: You'll see the pricing section with Stripe integration
3. **Click "Get Started"**: On any plan, you'll see a loading state
4. **Test Error Handling**: Since Stripe keys aren't configured yet, you'll see error handling in action

### 3. What's Working Now

✅ **Landing Page Pricing**: Fully integrated with payment context
✅ **Loading States**: Shows "Processing..." when payment is initiated
✅ **Error Handling**: Catches and logs payment errors
✅ **Navigation**: Links to detailed pricing page
✅ **Responsive Design**: Works on all screen sizes

### 4. Next Steps for Full Functionality

1. **Get Stripe Keys**: Sign up at https://dashboard.stripe.com
2. **Create Products**: Set up the three pricing plans
3. **Update Environment**: Add real keys to `.env` files
4. **Update Price IDs**: Replace placeholders in payment files

### 5. Test with Real Stripe (Optional)

Once you have real Stripe keys:
- Use test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any name

The payment flow will redirect to Stripe Checkout and back to your success/cancel pages.

### 6. Current Features

- **Landing Page**: Beautiful pricing cards with payment buttons
- **Dedicated Pricing Page**: `/pricing` with detailed plans
- **Payment Success Page**: `/payment/success`
- **Payment Cancel Page**: `/payment/cancel`
- **Sidebar Integration**: "Upgrade Plan" link in dashboard
- **Backend API**: Full Stripe integration endpoints

Everything is ready - just add your Stripe credentials to make it fully functional!

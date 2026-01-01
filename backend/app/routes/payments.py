import stripe
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
import os
from typing import Dict, Any

router = APIRouter()

# Initialize Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Map frontend plan names to actual Stripe price IDs
PRICE_IDS = {
    "basic": "price_1Oxxxxxxx",  # Replace with actual Basic price ID
    "pro": "price_1Oxxxxxxx",   # Replace with actual Pro price ID
    "premium": "price_1Oxxxxxxx"  # Replace with actual Premium price ID
}

@router.post("/process-payment")
async def process_payment(request: Request):
    try:
        data = await request.json()
        plan_name = data.get("planName")
        price = data.get("price")
        payment_details = data.get("paymentDetails", {})
        
        if not plan_name or not price:
            raise HTTPException(status_code=400, detail="Plan name and price are required")
        
        # Validate payment details
        required_fields = ["cardNumber", "expiryDate", "cvv", "cardholderName", "email"]
        for field in required_fields:
            if field not in payment_details or not payment_details[field]:
                raise HTTPException(status_code=400, detail=f"{field} is required")
        
        # In a real implementation, you would:
        # 1. Validate card details with a payment processor (Stripe, Braintree, etc.)
        # 2. Process the actual payment
        # 3. Handle 3D Secure if required
        # 4. Store transaction records
        
        # For demo purposes, simulate payment processing
        import time
        time.sleep(1)  # Simulate processing time
        
        # Mock successful payment
        transaction_id = f"txn_{int(time.time())}_{plan_name.lower()}"
        
        return JSONResponse(content={
            "success": True,
            "transaction_id": transaction_id,
            "plan": plan_name,
            "price": price,
            "message": "Payment processed successfully"
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Payment processing failed: {str(e)}")

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    try:
        data = await request.json()
        price_id = data.get("priceId")
        
        if not price_id:
            raise HTTPException(status_code=400, detail="Price ID is required")
        
        # Demo mode - return mock session for testing without real Stripe products
        if price_id in ['price_pro_id_here', 'price_premium_id_here']:
            return JSONResponse(content={
                "id": f"cs_test_demo_{price_id}",
                "url": f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/payment/success?session_id=demo_session"
            })
        
        # Check if it's a plan name or direct Stripe price ID
        if price_id in PRICE_IDS:
            # It's a plan name, map to Stripe price ID
            stripe_price_id = PRICE_IDS[price_id]
        elif price_id.startswith('price_'):
            # It's already a Stripe price ID
            stripe_price_id = price_id
        else:
            raise HTTPException(status_code=400, detail="Invalid price ID")
        
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price': stripe_price_id,
                'quantity': 1,
            }],
            mode='subscription',
            success_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/payment/success?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/payment/cancel",
            metadata={
                'price_id': price_id,
            }
        )
        
        return JSONResponse(content={"id": checkout_session.id, "url": checkout_session.url})
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@router.post("/create-payment-intent")
async def create_payment_intent(request: Request):
    try:
        data = await request.json()
        amount = data.get("amount")  # Amount in cents
        
        if not amount:
            raise HTTPException(status_code=400, detail="Amount is required")
        
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            automatic_payment_methods={
                'enabled': True,
            },
        )
        
        return JSONResponse(content={
            "clientSecret": intent.client_secret
        })
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/webhook")
async def webhook(request: Request):
    try:
        payload = await request.body()
        sig_header = request.headers.get('stripe-signature')
        
        webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
        if not webhook_secret:
            raise HTTPException(status_code=500, detail="Webhook secret not configured")
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
        
        # Handle the event
        if event.type == 'checkout.session.completed':
            session = event['data']['object']
            # Handle successful payment
            print(f"Payment successful for session: {session.id}")
            # TODO: Update user's subscription status in database
            
        elif event.type == 'invoice.payment_succeeded':
            invoice = event['data']['object']
            # Handle successful subscription payment
            print(f"Subscription payment succeeded: {invoice.id}")
            # TODO: Update user's subscription status
            
        elif event.type == 'invoice.payment_failed':
            invoice = event['data']['object']
            # Handle failed subscription payment
            print(f"Subscription payment failed: {invoice.id}")
            # TODO: Handle failed payment (notify user, etc.)
        
        return JSONResponse(content={"status": "success"})
        
    except ValueError as e:
        # Invalid payload
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/prices")
async def get_prices():
    """Get available pricing plans"""
    try:
        prices = stripe.Price.list(active=True)
        
        return JSONResponse(content={
            "prices": [
                {
                    "id": price.id,
                    "product": price.product,
                    "unit_amount": price.unit_amount,
                    "currency": price.currency,
                    "type": price.type,
                    "recurring": price.recurring
                }
                for price in prices.data
            ]
        })
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

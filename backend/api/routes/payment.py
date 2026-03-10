"""
Payment API endpoints (Stripe integration)
"""

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import stripe
import os
from backend.services.supabase_client import supabase

router = APIRouter(prefix="/payment", tags=["payment"])

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class CheckoutSessionRequest(BaseModel):
    order_id: str
    success_url: str
    cancel_url: str

@router.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutSessionRequest):
    """Create Stripe checkout session"""
    try:
        # Get order details
        order_response = supabase.table("orders").select("*").eq("id", request.order_id).execute()

        if not order_response.data:
            raise HTTPException(status_code=404, detail="Order not found")

        order = order_response.data[0]

        # Get order items with product details
        items_response = supabase.table("order_items").select("*, products(*)").eq("order_id", request.order_id).execute()

        # Create Stripe line items
        line_items = []
        for item in items_response.data:
            product = item["products"]
            line_items.append({
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": product["name"],
                        "description": f"{product['color']} · {product['size']}",
                        "images": [product["image_url"]],
                    },
                    "unit_amount": int(item["price"] * 100),  # Convert to cents
                },
                "quantity": item["quantity"],
            })

        # Create checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            mode="payment",
            success_url=request.success_url + f"?session_id={{CHECKOUT_SESSION_ID}}&order_id={request.order_id}",
            cancel_url=request.cancel_url,
            metadata={
                "order_id": request.order_id,
            },
        )

        # Update order with stripe session id
        supabase.table("orders").update({
            "stripe_payment_id": session.id
        }).eq("id", request.order_id).execute()

        return {"session_id": session.id, "url": session.url}

    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks"""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, webhook_secret
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle the event
    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        order_id = session["metadata"]["order_id"]

        # Update order status to paid
        supabase.table("orders").update({
            "status": "paid"
        }).eq("id", order_id).execute()

    return {"status": "success"}

@router.get("/session/{session_id}")
async def get_session(session_id: str):
    """Get Stripe session details"""
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return {
            "status": session.payment_status,
            "customer_email": session.customer_details.email if session.customer_details else None,
        }
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

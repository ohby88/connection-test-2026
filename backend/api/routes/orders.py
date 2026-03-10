"""
Orders API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List
from backend.models.database import Order, OrderCreate, OrderItem
from backend.services.supabase_client import supabase

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=Order)
async def create_order(order_data: OrderCreate):
    """Create new order"""
    try:
        # Calculate total
        total_amount = sum(item.price * item.quantity for item in order_data.items)

        # Create order
        order_dict = {
            "user_id": order_data.user_id,
            "total_amount": total_amount,
            "status": "pending",
            "shipping_address": order_data.shipping_address,
        }

        order_response = supabase.table("orders").insert(order_dict).execute()
        order_id = order_response.data[0]["id"]

        # Create order items
        items_data = [
            {
                "order_id": order_id,
                "product_id": item.product_id,
                "quantity": item.quantity,
                "price": item.price,
            }
            for item in order_data.items
        ]

        supabase.table("order_items").insert(items_data).execute()

        # Return complete order
        return {**order_response.data[0], "items": order_data.items}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get order by ID"""
    try:
        # Get order
        order_response = supabase.table("orders").select("*").eq("id", order_id).execute()

        if not order_response.data:
            raise HTTPException(status_code=404, detail="Order not found")

        order = order_response.data[0]

        # Get order items
        items_response = supabase.table("order_items").select("*").eq("order_id", order_id).execute()

        items = [
            OrderItem(
                product_id=item["product_id"],
                quantity=item["quantity"],
                price=item["price"]
            )
            for item in items_response.data
        ]

        return {**order, "items": items}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}")
async def get_user_orders(user_id: str):
    """Get all orders for a user"""
    try:
        response = supabase.table("orders").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.patch("/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """Update order status"""
    try:
        valid_statuses = ["pending", "paid", "shipped", "delivered", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail="Invalid status")

        response = supabase.table("orders").update({"status": status}).eq("id", order_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Order not found")

        return response.data[0]

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

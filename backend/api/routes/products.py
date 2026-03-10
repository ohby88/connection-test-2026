"""
Products API endpoints
"""

from fastapi import APIRouter, HTTPException
from typing import List, Optional
from backend.models.database import Product, ProductCreate
from backend.services.supabase_client import supabase

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    size: Optional[str] = None,
    limit: int = 20,
    offset: int = 0
):
    """Get all products with optional filters"""
    try:
        query = supabase.table("products").select("*")

        if category:
            query = query.eq("category", category)
        if size:
            query = query.eq("size", size)

        query = query.range(offset, offset + limit - 1)

        response = query.execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: int):
    """Get single product by ID"""
    try:
        response = supabase.table("products").select("*").eq("id", product_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Product not found")

        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=Product)
async def create_product(product: ProductCreate):
    """Create new product (admin only)"""
    try:
        response = supabase.table("products").insert(product.dict()).execute()
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/categories/list")
async def get_categories():
    """Get all unique categories"""
    try:
        response = supabase.table("products").select("category").execute()
        categories = list(set([item["category"] for item in response.data]))
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

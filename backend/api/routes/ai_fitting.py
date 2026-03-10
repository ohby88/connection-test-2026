"""
AI Virtual Fitting API endpoints
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from backend.models.database import AIFitting, AIFittingCreate
from backend.services.supabase_client import supabase
import sys
import os

# Add ai directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), "../../../"))
from ai.fitting import AIFittingService

router = APIRouter(prefix="/ai-fitting", tags=["ai-fitting"])

@router.post("/", response_model=AIFitting)
async def create_fitting(fitting_request: AIFittingCreate):
    """
    Create AI virtual fitting request
    Uploads dog image and generates fitting image
    """
    try:
        # Save request to database
        fitting_data = fitting_request.dict()
        fitting_data["status"] = "processing"

        response = supabase.table("ai_fittings").insert(fitting_data).execute()
        fitting_id = response.data[0]["id"]

        # Get product details
        product_response = supabase.table("products").select("*").eq("id", fitting_request.product_id).execute()

        if not product_response.data:
            raise HTTPException(status_code=404, detail="Product not found")

        product = product_response.data[0]

        # Generate AI fitting image
        ai_service = AIFittingService()
        result_url = await ai_service.generate_fitting_image(
            dog_image_url=fitting_request.dog_image_url,
            product_image_url=product["image_url"],
            product_description=f"{product['name']} - {product['color']} {product['category']}"
        )

        # Update with result
        if result_url:
            update_response = supabase.table("ai_fittings").update({
                "result_image_url": result_url,
                "status": "completed"
            }).eq("id", fitting_id).execute()

            return update_response.data[0]
        else:
            # Mark as failed
            supabase.table("ai_fittings").update({
                "status": "failed"
            }).eq("id", fitting_id).execute()

            raise HTTPException(status_code=500, detail="Failed to generate fitting image")

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{fitting_id}", response_model=AIFitting)
async def get_fitting(fitting_id: str):
    """Get AI fitting result by ID"""
    try:
        response = supabase.table("ai_fittings").select("*").eq("id", fitting_id).execute()

        if not response.data:
            raise HTTPException(status_code=404, detail="Fitting not found")

        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user/{user_id}")
async def get_user_fittings(user_id: str):
    """Get all fittings for a user"""
    try:
        response = supabase.table("ai_fittings").select("*").eq("user_id", user_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

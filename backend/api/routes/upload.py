"""
File upload API endpoints
"""

from fastapi import APIRouter, File, UploadFile, HTTPException
from backend.services.storage import StorageService

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/image")
async def upload_image(file: UploadFile = File(...)):
    """Upload image to Supabase Storage"""
    try:
        # Validate file type
        allowed_types = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid file type. Allowed: {', '.join(allowed_types)}"
            )

        # Read file content
        content = await file.read()

        # Get file extension
        extension = file.filename.split(".")[-1].lower() if "." in file.filename else "jpg"

        # Upload to storage
        storage = StorageService()
        url = await storage.upload_image(content, extension)

        if not url:
            raise HTTPException(status_code=500, detail="Failed to upload image")

        return {"url": url, "filename": file.filename}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

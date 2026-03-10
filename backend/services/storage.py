"""
Supabase Storage service for file uploads
"""

import os
from supabase import Client
from .supabase_client import supabase
import uuid
from typing import Optional

class StorageService:
    def __init__(self):
        self.client: Client = supabase
        self.bucket_name = "dog-images"  # Bucket for dog photos

    async def upload_image(self, file_content: bytes, file_extension: str = "jpg") -> Optional[str]:
        """
        Upload image to Supabase Storage

        Args:
            file_content: Image file bytes
            file_extension: File extension (jpg, png, etc.)

        Returns:
            Public URL of uploaded image
        """
        try:
            # Generate unique filename
            filename = f"{uuid.uuid4()}.{file_extension}"
            file_path = f"uploads/{filename}"

            # Upload to Supabase Storage
            response = self.client.storage.from_(self.bucket_name).upload(
                file_path,
                file_content,
                {
                    "content-type": f"image/{file_extension}",
                    "x-upsert": "false"
                }
            )

            if response:
                # Get public URL
                public_url = self.client.storage.from_(self.bucket_name).get_public_url(file_path)
                return public_url

            return None

        except Exception as e:
            print(f"Error uploading image: {e}")
            return None

    async def delete_image(self, file_path: str) -> bool:
        """Delete image from storage"""
        try:
            response = self.client.storage.from_(self.bucket_name).remove([file_path])
            return True
        except Exception as e:
            print(f"Error deleting image: {e}")
            return False

    def get_public_url(self, file_path: str) -> str:
        """Get public URL for a file"""
        return self.client.storage.from_(self.bucket_name).get_public_url(file_path)

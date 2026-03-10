from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# Product Models
class Product(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: float
    category: str  # sweater, jacket, dress, accessories
    size: str  # XS, S, M, L, XL
    color: str
    image_url: str
    stock: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    size: str
    color: str
    image_url: str
    stock: int

# User Models
class User(BaseModel):
    id: Optional[str] = None
    email: str
    name: Optional[str] = None
    created_at: Optional[datetime] = None

# Order Models
class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price: float

class Order(BaseModel):
    id: Optional[str] = None
    user_id: str
    items: list[OrderItem]
    total_amount: float
    status: str  # pending, paid, shipped, delivered, cancelled
    stripe_payment_id: Optional[str] = None
    shipping_address: dict
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

class OrderCreate(BaseModel):
    user_id: str
    items: list[OrderItem]
    shipping_address: dict

# AI Fitting Models
class AIFitting(BaseModel):
    id: Optional[str] = None
    user_id: str
    dog_image_url: str
    product_id: int
    result_image_url: Optional[str] = None
    result_video_url: Optional[str] = None
    status: str  # processing, completed, failed
    created_at: Optional[datetime] = None

class AIFittingCreate(BaseModel):
    user_id: str
    dog_image_url: str
    product_id: int

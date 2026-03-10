from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="Dog Fashion Shop API",
    description="API for dog clothing e-commerce with AI virtual fitting",
    version="1.0.0"
)

# CORS settings for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Local development
        "https://*.vercel.app",   # Vercel preview/production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Dog Fashion Shop API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# API Routes
from backend.api.routes import products, ai_fitting, orders, payment, upload

app.include_router(products.router, prefix="/api")
app.include_router(ai_fitting.router, prefix="/api")
app.include_router(orders.router, prefix="/api")
app.include_router(payment.router, prefix="/api")
app.include_router(upload.router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

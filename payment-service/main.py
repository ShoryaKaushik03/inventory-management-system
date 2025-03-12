import os
import logging
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from bson import ObjectId

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

db = client["payment_db"]

try:
    client.admin.command("ping")
    print("✅ MongoDB connection successful!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")

def get_db():
    if client is None:
        raise HTTPException(status_code=500, detail="MongoDB connection error")
    return db

# Pydantic model for order
class Order(BaseModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str  # pending, completed, refunded

# Use Docker service names instead of localhost
PAYMENT_SERVICE_URL = os.getenv("PAYMENT_SERVICE_URL", "http://payment-service:8000")

@app.get("/")
def read_root():
    return {"message": "Inventory Service Running!"}

@app.get("/check-payment")
def check_payment():
    response = requests.get(f"{PAYMENT_SERVICE_URL}/status")
    return response.json()

@app.get("/health", tags=["System"], summary="Health Check", description="Checks the health status of the MongoDB connection.")
def health_check():
    try:
        if client:
            client.admin.command('ping')
            return {"status": "success", "message": "MongoDB is connected!"}
        else:
            raise Exception("MongoDB client is not initialized")
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get('/orders/{order_id}', tags=["Orders"], summary="Get Order By ID", description="Fetch an order using its ID.")
def get_order(order_id: str):
    db = get_db()
    try:
        object_id = ObjectId(order_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid order ID format")
    
    order = db["orders"].find_one({"_id": object_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order["id"] = str(order["_id"])
    del order["_id"]  # Remove ObjectId field
    return order

@app.post('/orders', tags=["Orders"], summary="Create Order", description="Creates a new order.")
def create_order(order: Order):
    db = get_db()
    result = db["orders"].insert_one(order.dict())
    return {"id": str(result.inserted_id), **order.dict()}

# OpenAPI documentation setup
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Payment API",
        version="1.0.0",
        description="API for managing payments and orders",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

@app.get("/docs", tags=["Documentation"], summary="API Documentation", description="Returns the OpenAPI schema in JSON format.")
def get_openapi_json():
    return app.openapi()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.openapi.utils import get_openapi
from bson import ObjectId

import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)

try:
    client.admin.command("ping")
    print("✅ MongoDB connection successful!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")

db = client["inventory_db"]
products_collection = db["products"]

class Product(BaseModel):
    name: str
    price: float
    quantity: int

@app.get("/health")
def health_check():
    try:
        client.admin.command('ping')
        return {"status": "success", "message": "MongoDB is connected!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get('/products')
def get_all_products():
    return [
        {"id": str(product["_id"]), "name": product["name"], "price": product["price"], "quantity": product["quantity"]}
        for product in products_collection.find()
    ]

@app.post('/products')
def create_product(product: Product):
    logging.info(f"Received product: {product}")
    try:
        result = products_collection.insert_one(product.model_dump())  
        return {
            "id": str(result.inserted_id),
            "name": product.name,
            "price": product.price,
            "quantity": product.quantity
        }
    except Exception as e:
        logging.error(f"Error inserting product: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/products/{product_id}')
def get_product(product_id: str):
    product = products_collection.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"id": str(product["_id"]), "name": product["name"], "price": product["price"], "quantity": product["quantity"]}

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

import os
import time
import logging
from pymongo import MongoClient
from bson import ObjectId

logging.basicConfig(level=logging.INFO)

# MongoDB setup (fix connection issue)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")  
client = MongoClient(MONGO_URI)
db = client["inventory_db"]
products_collection = db["products"]
orders_collection = db["orders"]

logging.info("✅ Consumer service started. Waiting for orders...")

def process_orders():
    if client is None:
        print("Skipping order processing: No MongoDB connection.")
        return

    pending_orders = orders_collection.find({"status": "pending"})
    
    for order in pending_orders:
        print(f"Processing order: {order['_id']}")
        try:
            orders_collection.update_one({"_id": order["_id"]}, {"$set": {"status": "completed"}})
            print(f"Order {order['_id']} marked as completed.")
        except Exception as e:
            print(f"Error updating order {order['_id']}: {e}")

if __name__ == "__main__":
    while True:
        process_orders()
        time.sleep(5)  # Polling interval
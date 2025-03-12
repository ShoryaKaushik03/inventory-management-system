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

while True:
    try:
        logging.info("🔄 Checking for pending orders...")
        pending_orders = orders_collection.find({"status": "pending"})

        for order in pending_orders:
            logging.info(f"Processing order ID: {order['_id']}")

            product_id = order['product_id']
            quantity_ordered = order['quantity']

            # Fetch product
            product = products_collection.find_one({"_id": ObjectId(product_id)})

            if product and product["quantity"] >= quantity_ordered:
                # Update product stock
                new_quantity = product["quantity"] - quantity_ordered
                products_collection.update_one({"_id": ObjectId(product_id)}, {"$set": {"quantity": new_quantity}})
                orders_collection.update_one({"_id": order["_id"]}, {"$set": {"status": "completed"}})
                logging.info(f"✅ Order {order['_id']} completed. Remaining stock: {new_quantity}")
            else:
                orders_collection.update_one({"_id": order["_id"]}, {"$set": {"status": "refunded"}})
                logging.info(f"❌ Order {order['_id']} refunded due to insufficient stock.")

    except Exception as e:
        logging.error(f"Error in consumer loop: {e}")
        time.sleep(5)  # Retry after 5 seconds

    time.sleep(5)  # Delay before polling again

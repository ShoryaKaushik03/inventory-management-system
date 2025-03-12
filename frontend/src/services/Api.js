// import axios from 'axios';

// // Load Environment Variables
// const INVENTORY_SERVICE_URL = process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:8000';
// const PAYMENT_SERVICE_URL = process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8001';

// // Debugging - Check if environment variables are loaded
// console.log("🔹 REACT_APP_INVENTORY_SERVICE_URL:", INVENTORY_SERVICE_URL);
// console.log("🔹 REACT_APP_PAYMENT_SERVICE_URL:", PAYMENT_SERVICE_URL);

// // Create Axios Instances
// const inventoryService = axios.create({
//   baseURL: INVENTORY_SERVICE_URL,
//   timeout: 5000,
//   headers: { 'Content-Type': 'application/json' }
// });

// const paymentService = axios.create({
//   baseURL: PAYMENT_SERVICE_URL,
//   timeout: 5000,
//   headers: { 'Content-Type': 'application/json' }
// });

// // Debugging - Check Axios base URLs
// console.log("✅ Inventory Service Base URL:", inventoryService.defaults.baseURL);
// console.log("✅ Payment Service Base URL:", paymentService.defaults.baseURL);

// // Inventory Service API
// export const inventoryAPI = {
//     getAllProducts: async () => {
//         try {
//             console.log("📡 Fetching Products from:", INVENTORY_SERVICE_URL + "/products");
//             const response = await inventoryService.get('/products'); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error("❌ Error fetching products:", error);
//             throw error;
//         }
//     },
    
//     getProductById: async (id) => {
//         try {
//             console.log("📡 Fetching Product by ID:", INVENTORY_SERVICE_URL + `/products/${id}`);
//             const response = await inventoryService.get(`/products/${id}`); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error(`❌ Error fetching product ${id}:`, error);
//             throw error;
//         }
//     },

//     createProduct: async (product) => {
//         try {
//             console.log("📡 Creating Product at:", INVENTORY_SERVICE_URL + "/products");
//             const response = await inventoryService.post('/products', product); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error("❌ Error creating product:", error);
//             throw error;
//         }
//     },

//     deleteProduct: async (id) => {
//         try {
//             console.log("📡 Deleting Product at:", INVENTORY_SERVICE_URL + `/products/${id}`);
//             await inventoryService.delete(`/products/${id}`); // ✅ Using axios
//             return true;
//         } catch (error) {
//             console.error(`❌ Error deleting product ${id}:`, error);
//             throw error;
//         }
//     }
// };

// // Payment Service API
// export const paymentAPI = {
//     createOrder: async (order) => {
//         try {
//             console.log("📡 Creating Order at:", PAYMENT_SERVICE_URL + "/orders");
//             const response = await paymentService.post('/orders', order); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error("❌ Error creating order:", error);
//             throw error;
//         }
//     },

//     getOrderById: async (id) => {
//         try {
//             console.log("📡 Fetching Order by ID:", PAYMENT_SERVICE_URL + `/orders/${id}`);
//             const response = await paymentService.get(`/orders/${id}`); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error(`❌ Error fetching order ${id}:`, error);
//             throw error;
//         }
//     },

//     getAllOrders: async () => {
//         try {
//             console.log("📡 Fetching All Orders from:", PAYMENT_SERVICE_URL + "/orders");
//             const response = await paymentService.get('/orders'); // ✅ Using axios
//             return response.data;
//         } catch (error) {
//             console.error("❌ Error fetching orders:", error);
//             throw error;
//         }
//     }
// };


// import axios from 'axios';

// // Create base axios instances for each service
// const inventoryService = axios.create({
//   baseURL: process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:8000',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// const paymentService = axios.create({
//   baseURL: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8001',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Debugging: Print API URLs
// console.log('Inventory Service URL:', process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:8000');
// console.log('Payment Service URL:', process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8001');

// export const inventoryAPI = {
//   getAllProducts: async () => {
//     try {
//       const response = await inventoryService.get('/products');
//       return response.data; // ✅ Ensure returning the `data` field from Axios
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error;
//     }
//   },

//   getProductById: async (id) => {
//     try {
//       const response = await inventoryService.get(`/products/${id}`);
//       return response.data; // ✅ Correctly accessing `data`
//     } catch (error) {
//       console.error(`Error fetching product ${id}:`, error);
//       throw error;
//     }
//   },

//   createProduct: async (product) => {
//     try {
//       const response = await inventoryService.post('/products', product, {
//         headers: { "Content-Type": "application/json" }
//       });
//       return response.data; // ✅ Ensure returning `data`
//     } catch (error) {
//       console.error("Error creating product:", error);
//       throw error;
//     }
//   },

//   deleteProduct: async (id) => {
//     try {
//       const response = await inventoryService.delete(`/products/${id}`);
//       return response.data; // ✅ Ensure returning `data`
//     } catch (error) {
//       console.error(`Error deleting product ${id}:`, error);
//       throw error;
//     }
//   }
// };

// export const paymentAPI = {
//   createOrder: async (order) => {
//     try {
//       const response = await paymentService.post('/orders', order, {
//         headers: { "Content-Type": "application/json" }
//       });
//       return response.data; // ✅ Ensure returning `data`
//     } catch (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }
//   }
// };


import axios from 'axios';

// Create base axios instances for each service
// const inventoryService = axios.create({
//   baseURL: process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:8000',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// const paymentService = axios.create({
//   baseURL: process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8001',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// For debugging
// console.log('Inventory Service URL:', process.env.REACT_APP_INVENTORY_SERVICE_URL || 'http://localhost:8000');
// console.log('Payment Service URL:', process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:8001');

export const inventoryAPI = {
    getAllProducts: async () => {
        const response = await fetch("http://localhost:8000/products");
        // const response = await inventoryService.get('/products');
        if (!response.ok) throw new Error("Failed to fetch products");
        return response.json();
    },
    getProductById: async (id) => {
        const response = await fetch(`http://localhost:8000/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product");
        return response.json();
    },
    createProduct: async (product) => {
        const response = await fetch("http://localhost:8000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });
        if (!response.ok) throw new Error("Failed to create product");
        return response.json();
    },
    deleteProduct: async (id) => {
        const response = await fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete product");
        return response.json();
    },
};

export const paymentAPI = {
    createOrder: async (order) => {
        const response = await fetch("http://localhost:8001/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });
        if (!response.ok) throw new Error("Failed to create order");
        return response.json();
    },
};



// Inventory Service API
// export const inventoryAPI = {
//   getAllProducts: async () => {
//     try {
//       const response = await inventoryService.get('/products');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       throw error;
//     }
//   },
  
//   getProductById: async (id) => {
//     try {
//       const response = await inventoryService.get(`/products/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching product ${id}:`, error);
//       throw error;
//     }
//   },
  
//   createProduct: async (productData) => {
//     try {
//       const response = await inventoryService.post('/products', productData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating product:', error);
//       throw error;
//     }
//   },
  
//   deleteProduct: async (id) => {
//     try {
//       await inventoryService.delete(`/products/${id}`);
//       return true;
//     } catch (error) {
//       console.error(`Error deleting product ${id}:`, error);
//       throw error;
//     }
//   }
// };

// // Payment Service API
// export const paymentAPI = {
//   createOrder: async (orderData) => {
//     try {
//       const response = await paymentService.post('/orders', orderData);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error;
//     }
//   },
  
//   getOrderById: async (id) => {
//     try {
//       const response = await paymentService.get(`/orders/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching order ${id}:`, error);
//       throw error;
//     }
//   },
  
//   getAllOrders: async () => {
//     try {
//       const response = await paymentService.get('/orders');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       throw error;
//     }
//   }
// };
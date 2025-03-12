import { Products } from "./components/Products";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductsCreate } from "./components/ProductsCreate";
import { Orders } from "./components/Orders";
import React from 'react';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Route to display products */}
                <Route path="/" element={<Products />} />
                {/* Route to create a new product */}
                <Route path="/create" element={<ProductsCreate />} />
                {/* Route to display orders */}
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
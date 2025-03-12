import React from 'react';
import { Wrapper } from "./Wrapper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { inventoryAPI } from '../services/Api';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await inventoryAPI.getAllProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch products:', err.message);
                setError('Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const del = async (id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            try {
                await inventoryAPI.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.error('Failed to delete product:', err.message);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/create" className="btn btn-sm btn-outline-secondary">Add</Link>
                <Link to="/orders" className="btn btn-sm btn-outline-primary ms-2">View Orders</Link>
            </div>

            {loading && <p>Loading products...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && (
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No products found</td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-secondary" 
                                                onClick={() => del(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </Wrapper>
    );
};
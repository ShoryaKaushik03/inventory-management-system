import React from 'react';
import { useEffect, useState } from "react";
import { Wrapper } from "./Wrapper";
import { inventoryAPI, paymentAPI } from '../services/Api';

export const Orders = () => {
    const [id, setId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('Buy your favorite product');
    const [loading, setLoading] = useState(false);
    const [productLoading, setProductLoading] = useState(false);
    const [error, setError] = useState(null);
    const [productPrice, setProductPrice] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setMessage('Buy your favorite product');
                setProductPrice(null);
                return;
            }
            
            setProductLoading(true);
            
            try {
                const content = await inventoryAPI.getProductById(id);
                const price = parseFloat(content.price) * 1.2;
                setProductPrice(price);
                setMessage(`Your product price is $${price.toFixed(2)}`);
                setError(null);
            } catch (e) {
                console.error(`Error fetching product ${id}:`, e);
                setMessage('Product not found');
                setProductPrice(null);
                setError('Unable to find this product. Please check the ID.');
            } finally {
                setProductLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const submit = async e => {
        e.preventDefault();
        
        if (!id || !quantity) {
            setError('Please fill in all fields');
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            await paymentAPI.createOrder({
                id, 
                quantity: parseInt(quantity)
            });
            
            setMessage('Thank you for your order!');
            setId('');
            setQuantity('');
            setProductPrice(null);
        } catch (e) {
            console.error('Error creating order:', e);
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <div className="container">
                <main>
                    <div className="py-5 text-center">
                        <h2>Checkout form</h2>
                        <p className="lead">{message}</p>
                    </div>

                    {error && <div className="alert alert-danger mb-4">{error}</div>}

                    <form onSubmit={submit}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label className="form-label">Product ID</label>
                                <input 
                                    className="form-control" 
                                    value={id}
                                    onChange={e => setId(e.target.value)}
                                    disabled={productLoading || loading}
                                />
                                {productLoading && <small className="text-muted">Checking product...</small>}
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label">Quantity</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    min="1"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        
                        {productPrice && (
                            <div className="row mt-3">
                                <div className="col">
                                    <div className="alert alert-info">
                                        Total: ${(productPrice * (quantity || 0)).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <hr className="my-4" />
                        <button 
                            className="w-100 btn btn-primary btn-lg" 
                            type="submit"
                            disabled={loading || productLoading || !id || !quantity}
                        >
                            {loading ? 'Processing...' : 'Buy'}
                        </button>
                    </form>
                </main>
            </div>
        </Wrapper>
    );
};
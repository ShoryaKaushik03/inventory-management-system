import React from 'react';
import { Wrapper } from "./Wrapper";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { inventoryAPI } from '../services/Api';

export const ProductsCreate = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const submit = async e => {
        e.preventDefault();
        
        if (!name || !price || !quantity) {
            setError('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            console.log("Submitting Product:", { name, price, quantity });
            
            await inventoryAPI.createProduct({ 
                name, 
                price: parseFloat(price), 
                quantity: parseInt(quantity) 
            });
            
            navigate('/');
        } catch (err) {
            console.error("Error creating product:", err);
            setError('Failed to create product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            
            <form className="mt-3" onSubmit={submit}>
                <div className="form-floating pb-3">
                    <input 
                        className="form-control" 
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <label>Name</label>
                </div>

                <div className="form-floating pb-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        step="0.01"
                        min="0"
                    />
                    <label>Price</label>
                </div>

                <div className="form-floating pb-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Quantity"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        required
                        min="0"
                    />
                    <label>Quantity</label>
                </div>

                <button 
                    className="w-100 btn btn-lg btn-primary" 
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </Wrapper>
    );
};
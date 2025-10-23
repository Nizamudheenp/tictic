import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../pages/AdminDashboard.css';
import { showToast } from "../utils/toast";

const TAG_OPTIONS = [
  'New Arrival',
  'Special Price',
  'Top Brand',
  'Best Seller',
  'Limited Edition',
  'Top Discount Of The Sale',
  'Popular',
  'Sponsored',
  'Interested In',
  'Featured',
  'Top Deal'
];

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        tags: [],
        images: [],
    });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getaproduct/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'images') {
            setProduct({ ...product, images: value.split(',') });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleTagsChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setProduct({ ...product, tags: selected });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedProduct = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/updateProduct/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            showToast('success', 'Product updated successfully');
            setTimeout(() => {
                navigate('/admin/dashboard');
            }, 1000);
        } catch (error) {
            console.error('Error updating product', error);
            showToast('error', 'Error updating product');
        }
    };

    return (
        <div className="edit-product-page">
            <h1 className="edit-product-title">Edit Product</h1>
            {loading ? (
                <p>Loading product details...</p>
            ) : (
                <form onSubmit={handleSubmit} className="edit-product-form">
                    <div className="edit-product-input">
                        <label className="edit-product-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Description</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={product.category}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={product.brand}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Tags</label>
                        <select
                            multiple
                            value={product.tags}
                            onChange={handleTagsChange}
                            className="edit-product-field"
                        >
                            {TAG_OPTIONS.map((tagOption) => (
                                <option key={tagOption} value={tagOption}>
                                    {tagOption}
                                </option>
                            ))}
                        </select>
                        <small>Select multiple tags by holding Ctrl (or Cmd) key</small>
                    </div>
                    <div className="edit-product-input">
                        <label className="edit-product-label">Images (URLs)</label>
                        <input
                            type="text"
                            name="images"
                            value={product.images.join(',')}
                            onChange={handleInputChange}
                            required
                            className="edit-product-field"
                        />
                        <small>Enter image URLs separated by commas</small>
                    </div>
                    <div className="edit-product-images">
                        <h4>Current Images</h4>
                        {product.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`Product ${idx}`} className="edit-product-image" />
                        ))}
                    </div>

                    <button type="submit" className="edit-product-button">Update Product</button>
                </form>
            )}
        </div>
    );
};

export default EditProduct;

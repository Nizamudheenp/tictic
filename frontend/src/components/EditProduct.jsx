// EditProduct.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { showToast } from "../utils/toast";

const TAG_OPTIONS = [
  'New Arrival', 'Special Price', 'Top Brand', 'Best Seller',
  'Limited Edition', 'Top Discount Of The Sale', 'Popular',
  'Sponsored', 'Interested In', 'Featured', 'Top Deal'
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
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/updateProduct/${id}`,
        product,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('success', 'Product updated successfully');
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch (error) {
      console.error('Error updating product', error);
      showToast('error', 'Error updating product');
    }
  };

  return (
    <div className="mt-16 p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading product details...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Tags</label>
            <select
              multiple
              value={product.tags}
              onChange={handleTagsChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {TAG_OPTIONS.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
            <small className="text-gray-500">Select multiple tags by holding Ctrl (or Cmd) key</small>
          </div>

          {/* Images */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Images (URLs)</label>
            <input
              type="text"
              name="images"
              value={product.images.join(',')}
              onChange={handleInputChange}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <small className="text-gray-500">Enter image URLs separated by commas</small>
          </div>

          {/* Preview Images */}
          <div>
            <h4 className="font-semibold mb-2 text-gray-700">Current Images</h4>
            <div className="flex flex-wrap gap-2">
              {product.images.map((img, idx) => (
                <img key={idx} src={img} alt={`Product ${idx}`} className="w-24 h-24 object-cover rounded-lg" />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition-colors"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;

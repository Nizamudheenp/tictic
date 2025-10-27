import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showToast } from "../utils/toast";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showToast('success', 'Deletion successful');
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="mt-16 p-6">
      <button
        className="block  mb-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
        onClick={() => navigate('/admin/add-product')}
      >
        Add New Product
      </button>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{product.name}</h3>
            <p className="text-gray-600 mb-1"><strong>Description:</strong> {product.description}</p>
            <p className="text-gray-600 mb-1"><strong>Price:</strong> ₹{product.price}</p>
            <p className="text-gray-600 mb-1"><strong>Category:</strong> {product.category}</p>
            <p className="text-gray-600 mb-1"><strong>Brand:</strong> {product.brand}</p>
            <p className="text-gray-600 mb-2"><strong>Tags:</strong> {product.tags.join(', ')}</p>

            <div>
              <strong>Images:</strong>
              {product.images.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-1">No images available</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

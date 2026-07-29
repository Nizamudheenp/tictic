import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { showToast } from '../utils/toast';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
  const navigate = useNavigate();

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = product.rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={`full-${i}`} className="text-amber-400" />);
    }
    if (hasHalfStar) stars.push(<AiTwotoneStar key="half" className="text-amber-400" />);
    while (stars.length < 5) stars.push(<AiOutlineStar key={`empty-${stars.length}`} className="text-gray-200" />);

    return stars;
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("error", "Please login to add items to your cart");
      setTimeout(() => {
        navigate("/login");
      }, 800);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/addToCart`,
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", "Added to cart!");
    } catch (err) {
      console.error(err);
      showToast("error", "Could not add item to cart");
    }
  };

  return (
    <motion.div
      onClick={onClick}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer p-3"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div>
        {/* Constrained Height Image Container */}
        <div className="relative overflow-hidden h-48 w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-center">
          <img
            src={product.images?.[0] || '/placeholder.jpg'}
            alt={product.name}
            className="max-w-full max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }}
          />
          {product.brand && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-600 bg-white/95 rounded-md shadow-sm">
              {product.brand}
            </span>
          )}
        </div>

        {/* Text details */}
        <div className="px-2 pt-4 pb-1 text-start">
          <h5 className="text-gray-900 font-bold text-sm leading-snug group-hover:text-primary-500 transition-colors truncate">
            {product.name}
          </h5>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-xs">{renderStars()}</div>
            <span className="text-gray-400 text-[10px] font-semibold">({product.numReviews || 0})</span>
          </div>
        </div>
      </div>

      {/* Card bottom section with Add To Cart button as a block */}
      <div className="px-2 pt-3 pb-1 border-t border-gray-50 mt-3 flex flex-col gap-2">
        <h4 className="text-base font-black text-gray-950 text-start">₹{product.price}</h4>
        
        <button
          onClick={handleAddToCart}
          className="w-[60%] mx-auto flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-full text-white bg-gradient-to-r from-primary-500 to-yellow-400 hover:shadow-md transition-all active:scale-95"
        >
          <FiShoppingCart className="text-sm" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="px-6 py-10 mt-16">
        <h2 className="text-center text-lg text-primary-600 font-medium animate-pulse">
          Loading products...
        </h2>
      </section>
    );
  }

  return (
    <section id="Product-1" className="max-w-[1300px] mx-auto px-6 py-24">
      <div className="max-w-xl text-start mb-10">
        <h2 className="text-3xl md:text-5xl font-black text-gray-950 tracking-tight">
          Trending Shop
        </h2>
        <p className="text-gray-500 mt-2 text-base md:text-lg">
          Explore all sancart trending and hot dropshipping items.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;

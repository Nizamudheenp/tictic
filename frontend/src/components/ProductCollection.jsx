import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiTwotoneStar } from 'react-icons/ai';

const ProductCard = ({ product, onClick }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating || 0);
    const hasHalfStar = product.rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar  key={`full-${i}`} className="text-yellow-400"/>);
    }
    if (hasHalfStar) stars.push(<AiTwotoneStar  key="half" className="text-yellow-400"/>);
    while (stars.length < 5) stars.push(<AiOutlineStar  key={`empty-${stars.length}`} className="text-yellow-400/50"/>);

    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="w-full sm:w-[48%] md:w-[23%] p-4 rounded-2xl border border-slate-100 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer bg-white"
    >
      <img
        src={product.images?.[0] || '/placeholder.jpg'}
        alt={product.name}
        className="w-full h-60 object-cover rounded-xl"
      />
      <div className="mt-3 text-start">
        <span className="text-gray-500 text-xs">{product.brand || 'Brand'}</span>
        <h5 className="mt-1 text-gray-900 text-sm font-medium truncate">{product.name}</h5>
        <div className="flex items-center mt-1">
          <div className="flex">{renderStars()}</div>
          <span className="ml-1 text-gray-400 text-xs">({product.numReviews || 0})</span>
        </div>
        <h4 className="mt-2 text-primary-600 font-semibold text-sm">₹ {product.price}</h4>
      </div>
    </div>
  );
};

const ProductCollection = ({ title, tag, category, search, limit }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (tag) queryParams.append('tag', tag);
        if (category) queryParams.append('category', category);
        if (search) queryParams.append('search', search);
        if (limit) queryParams.append('limit', limit);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/getproducts?${queryParams.toString()}`
        );
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, [tag, category, search, limit]);

  if (!products.length) return null;

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-12" id="Product-1">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600 mt-1 mb-6">Explore our latest selection</p>

      <div className="flex flex-wrap gap-6 justify-start">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onClick={() => navigate(`/product/${product._id}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCollection;

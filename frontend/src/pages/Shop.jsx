import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Product = ({ image, brand, title, price, rating, numReviews, onClick }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400 text-sm" />);
    }

    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer transition flex flex-col items-center bg-white"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <div className="w-full text-left space-y-1">
        <span className="text-sm font-medium">{brand}</span>
        <h5 className="text-md font-semibold text-blue-700">{title}</h5>
        <div className="flex items-center gap-1">
          {renderStars()}
          <span className="text-xs text-gray-500">({numReviews || 0})</span>
        </div>
        <h4 className="text-lg font-semibold text-orange-600">₹ {price}</h4>
      </div>
    </div>
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
        <h2 className="text-center text-lg text-blue-700 font-medium">
          Loading products...
        </h2>
      </section>
    );
  }

  return (
    <section id="Product-1" className="px-6 py-10">
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product
              key={product._id}
              image={product.images?.[0] || "/placeholder.jpg"}
              brand={product.brand || "Brand"}
              title={product.name}
              price={product.price}
              rating={product.rating}
              numReviews={product.numReviews}
              onClick={() => navigate(`/product/${product._id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Shop;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/toast";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = getUserFromToken();
      setUser(userData);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/getaproduct/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/addreview/${id}`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("success", "Review submitted successfully");
      setRating(0);
      setComment("");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getaproduct/${id}`
      );
      setProduct(res.data);
    } catch (err) {
      console.error("Error submitting review:", err);
      showToast("error", "Error submitting review");
    }
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      showToast("error", "Please login to add items to your cart");
      setTimeout(() => {
        navigate("/login");
      }, 500);
      return;
    }
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/addToCart`,
      { productId: product._id, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    showToast("success", "Added to cart!");
  };

  const getAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    return total / reviews.length;
  };

  const renderStars = (ratingValue, interactive = false) => {
    const stars = [];
    const rounded = Math.round(ratingValue * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      let icon = <FaRegStar />;
      if (i <= rounded) icon = <FaStar />;
      else if (i - 0.5 === rounded) icon = <FaStarHalfAlt />;

      stars.push(
        <span
          key={i}
          onClick={() => {
            if (interactive) setRating(i);
          }}
          className={`text-yellow-400 text-lg ${
            interactive ? "cursor-pointer hover:scale-110 transition" : ""
          }`}
        >
          {icon}
        </span>
      );
    }
    return stars;
  };

  if (loading)
    return (
      <h2 className="text-center text-lg font-medium text-blue-600 mt-20">
        Loading...
      </h2>
    );
  if (!product)
    return (
      <h2 className="text-center text-lg font-medium text-orange-600 mt-20">
        Product not found
      </h2>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-6 py-10 md:px-20 bg-white mt-20">
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name}
          className="rounded-xl shadow-md w-full max-w-md md:h-[500px] sm:h-[400px]"
        />
      </div>

      <div className="flex-1 space-y-4">
        <h2 className="text-4xl font-bold">{product.name}</h2>
        <h4 className="text-base text-gray-600">
         <span className="font-medium">{product.brand}</span>
        </h4>

        <div className="flex items-center gap-2">
          {renderStars(getAverageRating(product.reviews))}
          <span className="text-sm text-gray-500">
            ({product.numReviews || 0} reviews)
          </span>
        </div>

        <p className="text-gray-700 text-base">
          {product.description || "No description available."}
        </p>

        <h3 className="text-2xl font-bold text-orange-600">
          ₹ {product.price}
        </h3>

        <button
          onClick={handleAddToCart}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md shadow-sm font-medium transition"
        >
          Add to Cart
        </button>

        {user && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-blue-700 mb-2">
              Write a Review
            </h4>
            <div className="flex gap-1 mb-3">{renderStars(rating, true)}</div>
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <label className="block text-sm text-gray-600">Comment:</label>
              <textarea
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        <div className="mt-6">
          <h4 className="text-lg font-semibold text-blue-700 mb-3">
            User Reviews
          </h4>
          {product.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="border border-gray-200 rounded-md p-3 shadow-sm"
                >
                  <strong className="text-orange-600">{rev.name}</strong>
                  <div className="flex gap-1 mt-1">{renderStars(rev.rating)}</div>
                  <p className="text-gray-700 mt-1">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

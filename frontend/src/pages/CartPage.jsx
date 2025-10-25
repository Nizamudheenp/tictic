import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/getCart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/updateCartItem`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
      showToast("error", "Error updating quantity");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/removeFromCart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/checkout", { state: { amount: totalPrice, cartItems, token } });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="text-center py-16 text-lg text-gray-600">Loading cart...</div>
    );

  return (
    <div className="mt-16 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-bold text-blue-700 text-left mb-8">My Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex flex-col md:flex-row items-center gap-4 border-b pb-4">
              <div className="flex-shrink-0 w-full md:w-40">
                <img
                  src={item.product.images?.[0] || "/placeholder.jpg"}
                  alt={item.product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-xl font-semibold text-gray-800">{item.product.name}</h4>
                <p className="text-gray-700">Price: ₹{item.product.price}</p>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 bg-gray-200 rounded-md text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.product._id, parseInt(e.target.value))
                      }
                      min="1"
                      className="w-16 text-center border border-gray-300 rounded-md p-1"
                    />
                    <button
                      onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded-md text-lg font-bold hover:bg-gray-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md w-32 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Total: ₹{totalPrice}</h3>
            <button
              onClick={handleCheckout}
              className="bg-blue-700 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

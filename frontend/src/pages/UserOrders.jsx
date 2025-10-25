import React, { useEffect, useState } from "react";
import axios from "axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/getuserorders`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className=" p-6 mt-16">
      <h2 className="text-3xl font-semibold text-center mb-8">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 mb-1">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="text-sm mb-1">
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : order.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-sm mb-1">
                <strong>Placed On:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm mb-1">
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p className="text-sm mb-3">
                <strong>Shipping Address:</strong> {order.shippingAddress}
              </p>

              <div>
                <p className="font-medium mb-2">Products:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {order.products.map((item, index) => (
                    <li key={index}>
                      {item.productId?.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;

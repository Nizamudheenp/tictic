import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/getAllOrders`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(res.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/updateorderstatus/${orderId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: res.data.status } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="mt-16 admin-orders-container p-6 bg-white min-h-screen">

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Products</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order.userId?.name || "N/A"}</td>
                  <td className="p-3">
                    {order.products.map((p,index) => (
                      <div key={`${p.productId?._id || 'no-id'}-${index}`}>
                        {p.productId?.name} × {p.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-medium">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`font-semibold ${
                        order.status === "delivered"
                          ? "text-green-500"
                          : order.status === "processing"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="succeeded">Succeeded</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

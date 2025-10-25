import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        className="bg-white rounded-2xl p-10 text-center shadow-lg max-w-sm w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-6"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: -45 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-8 h-4 border-b-4 border-l-4 border-white transform rotate-[45deg]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />
        </motion.div>

        <h2 className="text-2xl font-bold text-green-500 mb-2">
          Payment Successful
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase! Your order is confirmed.
        </p>

        <Link
          to="/myorders"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition"
        >
          Order Summary
        </Link>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

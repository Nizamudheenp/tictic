import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveOrderToBackend } from "../utils/saveOrder";
import { showToast } from "../utils/toast";
import { motion } from "framer-motion";
import { FiMapPin, FiCreditCard, FiArrowRight, FiShoppingBag, FiInfo } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ clientSecret, amount, cartItems, userToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!shippingAddress) {
      showToast('error', 'Please provide a shipping address');
      return;
    }
    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment error", error.message);
        showToast('error', error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        await saveOrderToBackend({
          cartItems,
          amount,
          userAddress: shippingAddress,
          paymentIntent,
          userToken,
        });
        navigate("/payment-success");
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/clearCart`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
      }
    } catch (error) {
      console.error("Error during payment or saving order:", error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto z-10 relative">
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8 p-6 md:p-8 bg-white border border-gray-100 rounded-3xl shadow-xl`}>
        {/* Left Side: Payment Element */}
        <div className="flex-[1.2] text-start">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-primary-500">
              <FiCreditCard />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Select Payment Method</h4>
          </div>
          <div className="border border-gray-100 rounded-2xl p-4 md:p-6 bg-slate-50/50">
            <PaymentElement />
          </div>
        </div>

        {/* Right Side: Order Summary & Address */}
        <div className="flex-1 text-start flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center text-accent-500">
                <FiShoppingBag />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
            </div>

            {/* Total Highlight */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl mb-6 flex justify-between items-center">
              <span className="text-sm text-gray-500 font-medium">Grand Total</span>
              <strong className="text-xl font-black text-primary-600">₹{amount}</strong>
            </div>

            {/* Shipping Address field */}
            <div className="space-y-2 mb-6">
              <label className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wide">
                <FiMapPin /> Shipping Address
              </label>
              <textarea
                required
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows="3"
                placeholder="Enter your full shipping address..."
                className="w-full border border-gray-200 rounded-2xl p-3.5 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:outline-none transition-all text-sm text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="flex items-start gap-2 bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-6 text-xs text-blue-700 leading-relaxed">
              <FiInfo className="mt-0.5 flex-shrink-0" />
              <span>Payments are processed securely via Stripe.</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-gradient-to-r from-primary-500 to-indigo-600 hover:from-primary-600 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/10 hover:shadow-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Confirm & Pay <FiArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

const PaymentPage = ({ amount, cartItems, userToken }) => {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const createIntent = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders/create-payment-intent`,
          { amount }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Error creating payment intent", err);
      }
    };
    createIntent();
  }, [amount]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-28 pb-16 overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-60"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            amount={amount}
            cartItems={cartItems}
            userToken={userToken}
          />
        </Elements>
      ) : (
        <div className="z-10 flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Initializing secure checkout...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;

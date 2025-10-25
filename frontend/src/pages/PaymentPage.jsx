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
      showToast('error', 'please provide a shipping address')
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
    <form onSubmit={handleSubmit}>
      <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-6 p-6 border border-gray-200 rounded-lg max-w-3xl mx-auto mt-20`}>
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-blue-700 mb-4">Select Payment Method</h4>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <PaymentElement />
          </div>
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">Order Summary</h3>
          <p className="mb-3 text-gray-700">
            Total Amount: <strong className="text-orange-500">₹{amount}</strong>
          </p>

          <label className="block text-gray-700 mb-1">Shipping Address:</label>
          <textarea
            required
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            rows="3"
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-blue-300"
          />

          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Now"}
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

  return clientSecret ? (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        amount={amount}
        cartItems={cartItems}
        userToken={userToken}
      />
    </Elements>
  ) : (
    <div className="text-center mt-20 text-gray-600 text-lg">Loading payment options...</div>
  );
};

export default PaymentPage;

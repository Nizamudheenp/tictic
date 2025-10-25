import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/toast";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      showToast("error", "Log in is required to send messages");
      setTimeout(() => navigate("/login"), 500);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/contact`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message.");
    }
  };

  return (
    <section className="mt-16 bg-white py-16 px-6 md:px-20 flex flex-col md:flex-row gap-12">
      <div className="flex-1 space-y-6">
        <h2 className="text-3xl font-bold text-blue-700">Contact Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We're here to help and answer any question you might have. We look
          forward to hearing from you! 😊
        </p>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>📍 Address:</strong> Wayanad, Kerala, India
          </p>
          <p>
            <strong>📞 Phone:</strong> +91 8921041726 / +91 24356787
          </p>
          <p>
            <strong>📧 Email:</strong> ticticofficialmail@gmail.com
          </p>

          <div className="mt-4">
            <h4 className="text-blue-700 font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-4 text-blue-700 text-xl">
              <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
              <FaWhatsapp className="hover:text-orange-500 cursor-pointer" />
              <FaTwitter className="hover:text-orange-500 cursor-pointer" />
              <FaYoutube className="hover:text-orange-500 cursor-pointer" />
              <FaPinterest className="hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md">
        {status && (
          <p
            className={`text-center font-medium mb-4 ${
              status.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
        <h3 className="text-2xl font-semibold text-blue-700 mb-4">
          Send Us a Message
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="5"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

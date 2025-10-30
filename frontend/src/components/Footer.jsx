import React from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaAppStoreIos,
  FaGooglePlay,
  FaStripe,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-blue-100 via-white to-orange-100  text-gray-700 py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <img
            src="/images/logo og.jpg"
            alt="Logo"
            className="w-24 h-16 object-contain mb-4"
          />
          <h4 className="text-lg font-semibold mb-3 text-blue-700">Contact</h4>
          <p className="text-sm mb-1">
            <strong>Address:</strong> Wayanad, Kerala
          </p>
          <p className="text-sm mb-1">
            <strong>Phone:</strong> +91 8921041725 / +91 24356787
          </p>

          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2 text-blue-700">
              Follow Us
            </h4>
            <div className="flex gap-3 text-xl text-orange-500">
              <FaFacebook className="hover:text-blue-600 transition" />
              <FaWhatsapp className="hover:text-green-500 transition" />
              <FaTwitter className="hover:text-sky-500 transition" />
              <FaYoutube className="hover:text-red-600 transition" />
              <FaPinterest className="hover:text-red-500 transition" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-700">About</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/about" className="hover:text-orange-600 transition">About Us</a></li>
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">Delivery Information</a></li>
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">Privacy Policy</a></li>
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">Terms & Conditions</a></li>
            <li><a href="/contact" className="hover:text-orange-600 transition">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-700">Account</h4>
          <ul className="flex flex-col gap-2 text-sm">
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">My Account</a></li>
            <li><a href="/login" className="hover:text-orange-600 transition">Sign In</a></li>
            <li><a href="/cart" className="hover:text-orange-600 transition">View Cart</a></li>
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">Track My Order</a></li>
            <li><a href="/coming-soon" className="hover:text-orange-600 transition">Help</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3 text-blue-700">Get Our App</h4>
          <p className="text-sm mb-3">Download from</p>
          <div className="flex items-center gap-4 text-3xl text-orange-500 mb-4">
            <FaAppStoreIos className="hover:text-blue-600 transition" />
            <FaGooglePlay className="hover:text-green-600 transition" />
          </div>
          <p className="text-sm mb-2">Secured Payment via</p>
          <FaStripe className="text-4xl text-blue-600 hover:text-orange-500 transition" />
        </div>
      </div>

      <div className="text-center mt-10 text-sm border-t border-blue-200 pt-6 text-gray-600">
        © {currentYear} <span className="font-semibold text-blue-700">tic tic</span> — Kids Crafts & Toys Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

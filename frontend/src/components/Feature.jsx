import React from 'react';
import { FiTruck, FiShoppingCart, FiDollarSign, FiTag, FiSmile, FiHeadphones } from 'react-icons/fi';

const features = [
  { icon: <FiTruck className="text-3xl text-primary-500" />, title: "Free Shipping" },
  { icon: <FiShoppingCart className="text-3xl text-primary-500" />, title: "Online Order" },
  { icon: <FiDollarSign className="text-3xl text-primary-500" />, title: "Save Money" },
  { icon: <FiTag className="text-3xl text-primary-500" />, title: "Promotions" },
  { icon: <FiSmile className="text-3xl text-primary-500" />, title: "Happy Sell" },
  { icon: <FiHeadphones className="text-3xl text-primary-500" />, title: "24/7 Support" }
];

const Feature = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-8 py-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 bg-white"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br from-primary-50 to-accent-50">
              {f.icon}
            </div>
            <h6 className="text-sm font-semibold text-gray-800 mt-2">{f.title}</h6>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feature;

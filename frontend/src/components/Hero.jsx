import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/shop");

  return (
    <section
      className="min-h-[100vh] bg-[url('/images/main-bg.jpg')] bg-cover bg-center flex items-center"
    >
      <div className="max-w-[1200px]  px-6 md:px-12 lg:px-16 py-24">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl p-8 md:p-10 max-w-2xl">
          <h4 className="text-lg md:text-xl text-gray-800 mb-3">Let's Click On The Top</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-500 leading-snug">
            tictic &ldquo;&rdquo;
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">
            On All Products
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700">
            Personalized essentials for kids
          </p>

          <div className="mt-6">
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-3 px-10 py-3 font-semibold rounded-xl text-white shadow-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-[1.05] transform transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

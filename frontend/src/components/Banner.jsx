import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return (
    <section
      id="banner"
      className="relative flex flex-col items-center justify-center text-center w-full h-[90vh]  px-4  bg-gradient-to-b from-slate-50 via-sky-200 to-slate-50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-white/70 backdrop-blur-[1px]" />

      <div className="relative z-10">
        <h4 className="text-pink-700 font-semibold text-lg md:text-xl tracking-wide">
          Handmade Happiness
        </h4>

        <h2 className="text-3xl md:text-4xl font-extrabold text-sky-900 leading-snug mt-2">
          Creative Name Labels & Crafts
        </h2>

        <p className="text-gray-700 mt-2 text-sm md:text-base">
          Bring smiles home — Up to{" "}
          <span className="text-pink-600 font-bold">60% Off</span> this week!
        </p>

        <button
          onClick={handleClick}
          className="mt-6 inline-flex items-center justify-center gap-3 px-10 py-3 font-semibold rounded-xl text-white shadow-lg bg-gradient-to-r from-primary-500 to-accent-500 hover:scale-[1.05] transform transition"
        >
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Banner;

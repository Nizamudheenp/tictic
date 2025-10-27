import React from "react";
import { useNavigate } from "react-router-dom";

const SmallBanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/shop");
  };

  return (
    <section
      id="sm-banner"
      className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 md:px-10 py-10"
    >
      <div
        className="flex flex-col justify-center items-start w-full md:w-1/2 h-[300px] md:h-[50vh] p-8 rounded-2xl bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/images/kids-banner1.jpg')",
        }}
      >
        <h4 className="text-lg font-medium">Colorful Offers</h4>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Buy 1 Get 1 Free
        </h2>
        <span className="text-sm md:text-base mb-4">
          Bright Name Slips & Toy Sets — limited time only!
        </span>
        <button
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition-all"
          onClick={handleClick}
        >
          Shop Now
        </button>
      </div>

      <div
        className="flex flex-col justify-center items-start w-full md:w-1/2 h-[300px] md:h-[50vh] p-8 rounded-2xl bg-cover bg-center text-white"
        style={{
          backgroundImage: "url('/images/kids-banner2.jpg')",
        }}
      >
        <h4 className="text-lg font-medium">Craft Corner</h4>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          New Arrivals
        </h2>
        <span className="text-sm md:text-base mb-4">
          Handmade crafts for creative little hands 🎨
        </span>
        <button
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition-all"
          onClick={handleClick}
        >
          Explore
        </button>
      </div>
    </section>
  );
};

export default SmallBanner;

import React from "react";

const SmallBanner2 = () => {
  return (
    <section
      id="banner-3"
      className="flex flex-wrap justify-center md:justify-between px-4 md:px-16 py-8 gap-6"
    >
{/* Banner 1 */}
      <div
        className="relative flex flex-col justify-start items-start w-full sm:w-[48%] lg:w-[30%] h-[30vh] p-6 rounded-xl bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-craft.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div> {/* overlay */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold drop-shadow-md">Seasonal Sale</h2>
          <h3 className="text-yellow-300 text-lg font-semibold">
            Handmade Toys - 50% Off
          </h3>
        </div>
      </div>

{/* Banner 2 */}
      <div
        className="relative flex flex-col justify-start items-start w-full sm:w-[48%] lg:w-[30%] h-[30vh] p-6 rounded-xl bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-toys.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold drop-shadow-md">New Craft Kits</h2>
          <h3 className="text-pink-300 text-lg font-semibold">
            Spring Collection 2025
          </h3>
        </div>
      </div>

{/* Banner 3 */}
      <div
        className="relative flex flex-col justify-start items-start w-full sm:w-[48%] lg:w-[30%] h-[30vh] p-6 rounded-xl bg-cover bg-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/poster 3.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold drop-shadow-md">
            Custom Name Labels
          </h2>
          <h3 className="text-red-300 text-lg font-semibold">
            Playful Designs for Kids
          </h3>
        </div>
      </div>
    </section>
  );
};

export default SmallBanner2;

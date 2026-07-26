import React from "react";
import { BsStarFill } from "react-icons/bs";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sophia Carter",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      comment: "Absolutely love the craftsmanship of the toys. sancart has become my go-to store for unique children's gifts!",
    },
    {
      name: "Liam Bennett",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      comment: "Great customer service and very fast shipping. The premium learning kits are both fun and highly educational.",
    },
    {
      name: "Emily Rodriguez",
      role: "Verified Buyer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      comment: "Stunning designs and top-notch materials. My kids love playing with these toys every single day.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by Parents Everywhere
          </h2>
          <p className="mt-3 text-lg text-gray-500">
            Here's what our happy community has to say about sancart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <BsStarFill key={i} className="text-amber-400 text-lg" />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary-50"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{rev.name}</h4>
                  <p className="text-xs text-gray-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

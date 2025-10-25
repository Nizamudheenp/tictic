import React from "react";

const About = () => {
  return (
    <section className="mt-8 bg-white py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to <strong className="text-orange-500">tictic</strong><br /> your one-stop destination for seamless toys shopping.
          Founded in 2025, tictic was born out of a simple idea: to make toys shopping easier, faster,
          and more enjoyable for everyone.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mt-8">Our Journey</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            What started as a small idea between a few passionate entrepreneurs is now one of the fastest-growing
            online toys marketplaces. From toys to kids essentials and unique handmade crafts,
            tictic brings together millions of products from trusted sellers across the country.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mt-8">Why tictic?</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Wide selection of quality products at competitive prices</li>
            <li>Secure payments and fast delivery</li>
            <li>User-friendly platform designed with you in mind</li>
            <li>24/7 customer support to help you with anything</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mt-8">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To redefine toys e-commerce by creating an ecosystem that empowers customers.
            We believe in transparent practices, reliable service, and giving our users the freedom to
            shop on their own terms.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mt-8">Meet the Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our team is a mix of dreamers, developers, designers, and customer champions.
            We work around the clock to make sure tictic stays fast, secure, and reliable —
            so that every order, every delivery, and every click brings satisfaction.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 mt-8">Join Our Journey</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            If you're a customer looking for the best deals on kids-related products,
            tictic is here for you. We’re just getting started, and the best is yet to come.
          </p>
        </div>

        <p className="text-gray-700 text-lg mt-8">
          <strong className="text-orange-500">Thank you for choosing tictic.</strong> Let’s build something great together.
        </p>
      </div>
    </section>
  );
};

export default About;

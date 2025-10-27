import React from "react";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  return (
    <div className="text-center flex flex-col items-center justify-center min-h-screen px-6">
      <h1 className="mb-3 text-3xl font-bold text-black-600">🚧 Page Under Construction</h1>
      <p className="mb-6 text-gray-600">We’re currently working on this page. Please check back soon!</p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-5 py-2 rounded-lg font-medium hover:bg-orange-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ComingSoon;

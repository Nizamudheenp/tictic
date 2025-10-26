import React, { useState } from 'react'
import axios from 'axios';
import { showToast } from '../utils/toast';
import { Link, useNavigate } from 'react-router-dom';


function RegisterPage() {
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData
      );
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      showToast('success', 'Registration successful');
      setTimeout(() => {
        navigate('/');
        location.reload();
      }, 500);
    } catch (error) {
      showToast('error', 'Registration failed');
    }
  }

  return (

    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-semibold text-center text-blue-700 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
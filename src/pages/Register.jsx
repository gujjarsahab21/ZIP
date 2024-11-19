// src/pages/Register.jsx
import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', membershipType: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration (e.g., send data to API or database)
    alert('Registration Successful!');
  };

  return (
    <div className="register bg-gray-50 py-10 pt-20">
      <div className="container mx-auto px-4 max-w-lg">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Register for Membership</h1>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6 transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="text-lg text-gray-700">Full Name</label>
            <input
              type="text"
              className="form-control w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="text-lg text-gray-700">Email</label>
            <input
              type="email"
              className="form-control w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="text-lg text-gray-700">Password</label>
            <input
              type="password"
              className="form-control w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Membership Type Field */}
          <div className="form-group">
            <label htmlFor="membershipType" className="text-lg text-gray-700">Membership Type</label>
            <select
              className="form-control w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              id="membershipType"
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
              required
            >
              <option value="">Select Membership Type</option>
              <option value="Type I">Type I</option>
              <option value="Type II">Type II</option>
              <option value="Type III">Type III</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending data to an API or email service)
    alert('Message Sent!');
  };

  return (
    <>
    <Navbar />
    <div className="contact-us bg-gray-50 py-10 pt-20">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Contact Us</h1>
        <p className="text-center text-lg text-gray-600 mb-10 animate__animated animate__fadeIn animate__delay-1s">
          If you have any questions or need assistance, feel free to contact us.
        </p>

        {/* Contact Info Section */}
        <section className="contact-info py-10">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1.5s">Our Contact Information</h3>
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              Email: <a href="mailto:zip.planner@gmail.com" className="text-indigo-600 hover:underline">zip.planner@gmail.com</a>
            </p>
            <p className="text-lg text-gray-700">
              Phone: <span className="text-indigo-600">0975720015 / 0976653703 / 0964526170</span>
            </p>
            <p className="text-lg text-gray-700">
              Address: P.O Box 51348, Block 2 Room 2, Fairley Road, Lusaka, Zambia
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form py-10">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-2s">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-2xl">
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
            <div className="form-group">
              <label htmlFor="message" className="text-lg text-gray-700">Message</label>
              <textarea
                className="form-control w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
    </>
  );
}

export default ContactUs;

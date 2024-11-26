// src/pages/Membership.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Membership = () => {
  return (
    <>
    <Navbar />
    <div className="membership bg-gray-50 py-10 pt-20">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Membership Categories</h1>

        {/* Membership Types Section */}
        <section className="membership-types grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
          <div className="card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Type I - Urban and Regional Planning</h3>
            <p className="text-lg text-gray-600">
              Members with expertise in spatial planning, land use planning, and urban design.
            </p>
          </div>
          <div className="card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Type II - Socio-economic Planning</h3>
            <p className="text-lg text-gray-600">
              Members with expertise in social development, economic planning, and related fields.
            </p>
          </div>
          <div className="card p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Type III - Environmental Planning</h3>
            <p className="text-lg text-gray-600">
              Members with expertise in environmental issues and sustainability in planning.
            </p>
          </div>
        </section>

        {/* Membership Benefits Section */}
        <section className="membership-benefits py-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">Why Join ZIP?</h2>
          <p className="text-center text-lg text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-1.5s">
            As a member of the Zambia Institute of Planners, you gain access to:
          </p>
          <ul className="list-disc list-inside space-y-4 text-lg text-gray-600">
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">
              Networking opportunities with professionals in the field.
            </li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">
              Access to exclusive training and development programs.
            </li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">
              Participation in conferences and events across Zambia and internationally.
            </li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">
              Continuous professional development and mentoring.
            </li>
          </ul>
          <p className="text-center mt-6 animate__animated animate__fadeIn animate__delay-2s">
            To join ZIP, please{' '}
            <a
  className="btn btn-primary text-white bg-indigo-600 py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transform hover:scale-105 transition duration-300"
>
  <Link to="/register">Register Now</Link>
</a>
          </p>
        </section>
      </div>
    </div>
    </>
  );
}

export default Membership;

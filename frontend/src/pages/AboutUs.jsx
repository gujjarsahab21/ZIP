// src/pages/AboutUs.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar />
  
    <div className="about-us bg-gray-50 py-10 pt-24">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">About Zambia Institute of Planners</h1>
        <p className="text-center text-lg text-gray-700 mb-10 animate__animated animate__fadeIn animate__delay-1s">
          Zambia Institute of Planners (ZIP) is the professional body for urban and regional planning practitioners
          in Zambia. We aim to promote sustainable urban planning, advocate for policies, and provide a platform for
          continuous professional development.
        </p>

        {/* Mission & Vision Section */}
        <section className="mission-vision grid grid-cols-1 sm:grid-cols-2 gap-10 py-10 animate__animated animate__fadeIn animate__delay-2s">
          <div className="col p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mission</h3>
            <p className="text-lg text-gray-600">
              To achieve professional self-regulation and regulate planning practice in the public interest through
              continuous professional development of our members.
            </p>
          </div>
          <div className="col p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vision</h3>
            <p className="text-lg text-gray-600">
              To become the best planning professional body with a coherent organizational and professional platform
              for the advancement of all planners and the creation of livable places through quality.
            </p>
          </div>
        </section>

        {/* Functions of ZIP Section */}
        <section className="functions py-10">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">Functions of ZIP</h3>
          <ul className="space-y-4 text-lg text-gray-600 list-inside">
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">Promote spatial, aesthetic, economic, and social development.</li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">Register planners and planning firms and regulate their professional conduct.</li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">Develop and promote international standards for planning practice in Zambia.</li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">Advise the government on matters relating to the planning profession.</li>
            <li className="transform hover:translate-x-2 transition duration-300 ease-in-out hover:text-indigo-600">Raise the character and status of planners to increase community confidence in the profession.</li>
          </ul>
        </section>
      </div>
    </div>
    </>
  );
}

export default AboutUs;

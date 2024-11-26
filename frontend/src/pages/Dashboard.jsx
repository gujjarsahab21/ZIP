import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // For smoother animations
import LoggedInNavbar from './LoggedInNavbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token not found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {  // Use dynamic URL
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user data:', err.response?.data || err.message);
        setError('Unable to fetch user data. Please log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="text-center">
          <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-xl text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LoggedInNavbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl space-y-8">
          <motion.h1
            className="text-4xl font-semibold text-center text-gray-800 mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome, {user.username} !
          </motion.h1>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Profile Info Section */}
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-semibold text-xl mb-4 text-blue-600">Profile Info</h2>
              <motion.p className="text-lg text-gray-700"><strong>Name:</strong> {user.firstName} {user.lastName}</motion.p>
              <motion.p className="text-lg text-gray-700"><strong>Email:</strong> {user.email}</motion.p>
              <motion.p className="text-lg text-gray-700"><strong>Membership Status:</strong> {user.membershipStatus}</motion.p>
              <motion.p className="text-lg text-gray-700"><strong>Membership Type:</strong> {user.membershipType}</motion.p>
              <motion.p className="text-lg text-gray-700"><strong>Planner ID:</strong> {user.plannerId}</motion.p>
            </motion.div>

            {/* Uploaded Documents Section */}
            {user.uploadedDocuments?.length > 0 && (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="font-semibold text-xl mb-4 text-blue-600">Uploaded Documents</h2>
                <ul className="list-disc ml-6 text-gray-700 space-y-2">
                  {user.uploadedDocuments.map((doc, index) => (
                    <motion.li key={index} className="hover:text-blue-600 transition-colors duration-300">
                      <a href={doc} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {doc}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

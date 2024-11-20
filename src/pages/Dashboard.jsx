// Example of protected route: Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // If no token is found, redirect to the login page
      navigate('/login');
    } else {
      // Fetch user data if token exists
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err);
      navigate('/login'); // Redirect to login if error occurs
    }
  };

  return (
    <div className='p-40'>
      {user ? (
        <h1>Welcome, {user.name}</h1>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;

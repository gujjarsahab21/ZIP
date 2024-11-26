import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoggedInNavbar from './LoggedInNavbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return navigate('/login'); // Redirect to login if no token
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setPhone(response.data.phone || '');
        setAddress(response.data.address || '');
        setLoading(false);
      } catch (error) {
        console.error(error);
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/profile`,
        { firstName, lastName, phone, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data); // Update the user data
      setEditing(false); // Stop editing mode
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div>
      <LoggedInNavbar />
      <div className="container mx-auto p-8 flex justify-center items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 p-8">
          <h1 className="text-3xl font-semibold text-center mb-6">Your Profile</h1>
          <div className="space-y-6">
            {editing ? (
              <form onSubmit={handleSaveChanges} className="space-y-4">
                <div>
                  <label className="block font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                  />
                </div>
                <div className="flex space-x-4 mt-4">
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone || 'Not Provided'}</p>
                <p><strong>Address:</strong> {user.address || 'Not Provided'}</p>
                <p><strong>Membership Status:</strong> {user.membershipStatus}</p>
                <p><strong>Membership Type:</strong> {user.membershipType}</p>
                <p><strong>Planner ID:</strong> {user.plannerId}</p>
                <div className="mt-6 text-center">
                  <button
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

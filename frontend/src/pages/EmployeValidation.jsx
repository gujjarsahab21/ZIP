import React, { useState } from 'react';
import axios from 'axios';
import LoggedInNavbar from './LoggedInNavbar';

const MembershipValidator = () => {
  const [plannerId, setPlannerId] = useState(''); // State for the planner ID input
  const [membershipData, setMembershipData] = useState(null); // State for storing the fetched membership data
  const [error, setError] = useState(null); // State for errors
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleSearch = async () => {
    if (!plannerId) {
      setError('Please enter a Planner ID');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/membership/validate`, { plannerId });
   
      setMembershipData(response.data.data); // Display membership details
      setError(null);
    } catch (err) {
      setError('Planner ID not found or server error');
      setMembershipData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoggedInNavbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg transform transition duration-500 hover:scale-105 mt-10 animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Validate Membership</h2>

        {/* Planner ID input field */}
        <div className="mb-6">
          <label htmlFor="plannerId" className="block text-sm font-semibold text-gray-700 mb-2">Enter Planner ID</label>
          <input
            type="text"
            id="plannerId"
            className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Enter Planner ID"
            value={plannerId}
            onChange={(e) => setPlannerId(e.target.value)} // Update plannerId state as user types
          />
        </div>

        {/* Button to trigger the validation */}
        <button
          onClick={handleSearch}
          className={`w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? 'Validating...' : 'Validate Membership'}
        </button>

        {/* Error message */}
        {error && <p className="mt-4 text-red-500 text-center font-semibold animate__animated animate__shakeX">{error}</p>}

        {/* Display membership data if available */}
        {membershipData && (
          <div className="mt-6 p-6 bg-gray-100 border rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-1s">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Membership Details</h3>
            <p><strong className="text-blue-600">Planner ID:</strong> {membershipData.plannerId}</p>
            <p><strong className="text-blue-600">Expiry Date:</strong> {new Date(membershipData.expiryDate).toLocaleDateString()}</p>
            <p><strong className="text-blue-600">Membership Category:</strong> {membershipData.membershipCategory}</p>

            {membershipData.disciplinaryActions.length > 0 ? (
              <div className="mt-4">
                <strong className="text-red-600">Disciplinary Actions:</strong>
                <ul className="list-disc pl-6 mt-2">
                  {membershipData.disciplinaryActions.map((action, index) => (
                    <li key={index} className="text-gray-600">{action}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-green-600 mt-2">No disciplinary actions found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MembershipValidator;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../adminNavbar';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [filters, setFilters] = useState({
    status: '', // Membership status filter
    renewalStatus: '', // Renewal status filter
    startDate: '', // Start date for date range filter
    endDate: '' // End date for date range filter
  });

  // API URL fetched from environment variables
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch dashboard data with filters
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        params: filters // Send filters as query parameters
      });
      setDashboardData(response.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this only runs once

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Submit filters to fetch filtered data
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData(); // Re-fetch data based on updated filters
  };

  if (!dashboardData) return <p className="text-center text-xl">Loading...</p>;

  return (
    <>
      <AdminNavbar />
      <div className="admin-dashboard min-h-screen bg-gray-100 p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Admin Dashboard</h2>

        {/* Filters Form */}
        <form className="filters-form max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8" onSubmit={handleFilterSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Renewal Status</label>
              <select
                name="renewalStatus"
                value={filters.renewalStatus}
                onChange={handleFilterChange}
                className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="renewed">Renewed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
                className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
                className="mt-1 p-2 w-full bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Apply Filters
            </button>
          </div>
        </form>

        {/* Dashboard Data */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Members</h3>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.totalMembers}</p>
            </div>
            <div className="text-blue-600 text-4xl">👥</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Active Members</h3>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.activeMembers}</p>
            </div>
            <div className="text-green-600 text-4xl">✅</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Pending Renewals</h3>
              <p className="text-2xl font-bold text-gray-900">{dashboardData.pendingRenewals}</p>
            </div>
            <div className="text-yellow-600 text-4xl">⏳</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Total Payments</h3>
              <p className="text-2xl font-bold text-gray-900">${dashboardData.totalPayments}</p>
            </div>
            <div className="text-green-600 text-4xl">💰</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handlePayFees = () => {
    navigate("/payment");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("x-token");
      alert("Logged out successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </button>
        </div>

        {/* Welcome Section */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your profile and payments from one place.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Pay College Fees
              </h3>
              <button
                onClick={handlePayFees}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Pay Now
              </button>
            </div>
            <p className="text-gray-600">
              Pay your semester fees securely using our payment gateway.
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                My Profile
              </h3>
              <button
                onClick={() => navigate("/myprofile")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                View
              </button>
            </div>
            <p className="text-gray-600">
              View and update your personal information and academic details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

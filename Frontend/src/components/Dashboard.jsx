import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("x-token");
      localStorage.removeItem("userId"); // Clear user ID on logout
      alert("Logged out successfully!");
      navigate("/");
    }
  };

  const handleViewProfile = () => {
    const userId = localStorage.getItem("userId"); // Fetch user ID from local storage
    if (userId) {
      navigate(`/myprofile/${userId}`); // Navigate to the MyProfile component with user ID
    } else {
      alert("User ID not found. Please log in again.");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Navbar with Logout */}
      <div className="flex p-4 bg-gray-800 justify-between md:px-40">
        <h1 className="text-white text-2xl font-bold mt-1">Patient Portal</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Logout
        </button>
      </div>

      {/* Full-Screen Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('./public/2441768.webp')", // Set your full-screen background image path here
          filter: "blur(4px)", // Apply blur effect to the background
        }}
      >
        <div className="flex items-center justify-center h-full">
          {/* Removed the title text */}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <p className="text-gray-600">
            Manage your health records and personal information from one place.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                My Profile
              </h3>
              <button
                onClick={handleViewProfile}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                View
              </button>
            </div>
            <p className="text-gray-600">
              Access and manage your personal information and health records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

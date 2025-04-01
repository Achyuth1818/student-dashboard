import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for API calls

const MyProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [profileData, setProfileData] = useState(null); // State to hold user profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("x-token");
        if (!token) {
          throw new Error("Token not found. Please log in again.");
        }

        const response = await axios.get(
          "http://localhost:8080/api/myprofile",
          {
            headers: { "x-token": token },
          }
        );

        // Set the user data from the response
        setProfileData(response.data.user);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch profile data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleNavigateToFitnessTracker = () => {
    navigate("/fitness-tracker"); // Navigate to the FitnessTracker component
  };

  const handleNavigateToAddFitness = () => {
    navigate("/add-fitness"); // Navigate to the AddFitness component
  };

  const handleViewProfile = () => {
    navigate("/view-profile"); // Navigate to the ViewProfile component
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl font-medium mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('./public/2441768.webp')",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="text-center bg-white rounded-lg shadow-lg p-6 z-10">
          {" "}
          {/* Added z-10 to ensure content is above background */}
          <h1 className="text-3xl font-bold text-indigo-600 mb-4">
            My Profile
          </h1>
          <p className="text-gray-600 mb-6">Manage your fitness data</p>
          {profileData && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold">User Details</h2>
              <p className="text-gray-700">Username: {profileData.username}</p>
              <p className="text-gray-700">Email: {profileData.email}</p>
              {/* Add more user details as needed */}
            </div>
          )}
          <div className="space-x-4">
            <button
              onClick={handleNavigateToFitnessTracker}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Go to Fitness Tracker
            </button>
            <button
              onClick={handleNavigateToAddFitness}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              Add Fitness Details
            </button>
            <button
              onClick={handleViewProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              View Full Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

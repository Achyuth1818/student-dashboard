import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const [profileData, setProfileData] = useState(null); // State to hold user profile data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate();

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

  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('./public/health-medical-healthcare-health.jpg')",
          filter: "blur(6px)",
        }}
      />
      <div className="container mx-auto px-4 py-8 relative z-10 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
        {profileData && (
          <div className="space-y-2 text-center">
            <p className="text-gray-800">
              <strong>Username:</strong> {profileData.username}
            </p>
            <p className="text-gray-800">
              <strong>Email:</strong> {profileData.email}
            </p>
            {profileData.age && (
              <p className="text-gray-800">
                <strong>Age:</strong> {profileData.age}
              </p>
            )}
            {profileData.height && (
              <p className="text-gray-800">
                <strong>Height:</strong> {profileData.height} cm
              </p>
            )}
            {profileData.weight && (
              <p className="text-gray-800">
                <strong>Weight:</strong> {profileData.weight} kg
              </p>
            )}
            <p className="text-gray-800">
              <strong>Health Goals:</strong>{" "}
              {profileData.healthGoals ||
                "Maintain a balanced diet, exercise regularly, and stay hydrated."}
            </p>
          </div>
        )}

        <button
          onClick={goToMyProfile}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 mx-auto block"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewProfile;

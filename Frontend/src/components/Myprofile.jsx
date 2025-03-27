import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const MyProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        // Set the user data from the nested user object
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-indigo-600 px-6 py-8">
              <h1 className="text-3xl font-bold text-white text-center">
                My Profile
              </h1>
              <p className="text-indigo-100 text-center mt-2">
                View and manage your account information
              </p>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              {profileData ? (
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {Object.entries(profileData).map(([key, value]) => (
                          <tr
                            key={key}
                            className="border-b border-gray-200 last:border-0"
                          >
                            <td className="py-4 px-6 font-medium text-gray-700 capitalize bg-gray-50">
                              {key.replace(/_/g, " ")}
                            </td>
                            <td className="py-4 px-6 text-gray-600">
                              {value.toString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 mt-8">
                    <button
                      onClick={() => window.location.reload()}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      Refresh Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No profile data available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

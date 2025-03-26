import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Myprofile = () => {
  const [profileData, setProfileData] = useState(null);
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
            headers: {
              "x-token": token, // Use x-token header
            },
          }
        );

        // Display the raw response data
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch profile data. Please try again later."
        );
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 border-b-2 border-dashed border-gray-300">
            My Profile
          </h2>
          {error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : profileData ? (
            <pre className="text-gray-700 text-sm whitespace-pre-wrap">
              {JSON.stringify(profileData, null, 2)}
            </pre>
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myprofile;

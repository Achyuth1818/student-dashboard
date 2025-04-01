// HeroSection.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate for navigation

  const handleCheckHealth = () => {
    navigate("/register"); // Redirect to the register page
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{ backgroundImage: "url('./public/U0rczZ.webp')" }} // Keep your health tracker image path here
    >
      <div className="bg-black bg-opacity-50 p-10 rounded-lg sm:mt-20 text-center md:my-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Health Tracker Application
        </h1>
        <p className="text-xl text-blue-100 mb-12">
          Track your health and achieve your wellness goals
        </p>

        {/* Health Tracking Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">
              Monitor Your Progress
            </h3>
            <p className="text-blue-100">
              Keep track of your health metrics and improvements.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Set Personal Goals</h3>
            <p className="text-blue-100">
              Define and achieve your health and fitness objectives.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Stay Motivated</h3>
            <p className="text-blue-100">
              Get reminders and tips to keep you on track.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Nutrition Tracking</h3>
            <p className="text-blue-100">
              Log your meals and monitor your nutritional intake.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Activity Log</h3>
            <p className="text-blue-100">
              Record your workouts and daily activities.
            </p>
          </div>
          <div className="p-6 bg-white/10 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Health Insights</h3>
            <p className="text-blue-100">
              Receive personalized insights based on your data.
            </p>
          </div>
        </div>

        {/* Check Your Health Button */}
        <button
          onClick={handleCheckHealth}
          className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
        >
          Check Your Health
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

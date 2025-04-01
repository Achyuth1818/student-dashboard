import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddFitness = () => {
  const [formData, setFormData] = useState({
    weight: "",
    age: "",
    sugarLevel: "",
    bloodPressure: "",
    heartRate: "",
    cholesterolLevel: "",
    exerciseDuration: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("x-token");
      const userId = localStorage.getItem("userId");
      const dataToSubmit = { ...formData, userId };

      await axios.post("http://localhost:8080/api/fitness", dataToSubmit, {
        headers: { "x-token": token },
      });
      setSuccess("Fitness data added successfully!");
      setError("");
      setFormData({
        weight: "",
        age: "",
        sugarLevel: "",
        bloodPressure: "",
        heartRate: "",
        cholesterolLevel: "",
        exerciseDuration: "",
      });
    } catch (err) {
      console.error("Error adding fitness data:", err);
      setError("Failed to add fitness data. Please try again later.");
      setSuccess("");
    }
  };

  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('./public/624111.webp')", // Change to your desired image path
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-2xl text-cyan-50 font-bold mb-4">
          Add Fitness Details
        </h1>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="number"
              name="sugarLevel"
              placeholder="Sugar Level"
              value={formData.sugarLevel}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              name="bloodPressure"
              placeholder="Blood Pressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="number"
              name="heartRate"
              placeholder="Heart Rate"
              value={formData.heartRate}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="number"
              name="cholesterolLevel"
              placeholder="Cholesterol Level"
              value={formData.cholesterolLevel}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="number"
              name="exerciseDuration"
              placeholder="Exercise Duration (minutes)"
              value={formData.exerciseDuration}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Add Fitness Data
          </button>
        </form>

        <button
          onClick={goToMyProfile}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddFitness;

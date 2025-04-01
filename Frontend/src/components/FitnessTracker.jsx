import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root"); // Set the app element for accessibility

const FitnessTracker = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFitnessData();
  }, []);

  const fetchFitnessData = async () => {
    try {
      const token = localStorage.getItem("x-token");
      const response = await axios.get("http://localhost:8080/api/fitness", {
        headers: { "x-token": token },
      });

      // The API should return only the fitness data for the authenticated user
      const fitnessData = response.data.data; // No need to filter again if the API is correct

      if (!fitnessData.length) {
        setError("No fitness data found for this user.");
      }

      setFitnessData(fitnessData); // Set the fetched data
    } catch (err) {
      console.error("Error fetching fitness data:", err);
      setError("Failed to fetch fitness data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (data) => {
    setCurrentData(data);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentData(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("x-token");
      const response = await axios.put(
        `http://localhost:8080/api/fitness/${currentData._id}`,
        currentData,
        {
          headers: { "x-token": token },
        }
      );
      alert("Fitness data updated successfully!");
      fetchFitnessData(); // Refresh data
      closeModal();
    } catch (err) {
      console.error("Error updating fitness data:", err);
      alert("Failed to update fitness data. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const token = localStorage.getItem("x-token");
        await axios.delete(`http://localhost:8080/api/fitness/${id}`, {
          headers: { "x-token": token },
        });
        alert("Fitness data deleted successfully!");
        fetchFitnessData(); // Refresh data
      } catch (err) {
        console.error("Error deleting fitness data:", err);
        alert("Failed to delete fitness data. Please try again later.");
      }
    }
  };

  const goToMyProfile = () => {
    navigate("/myprofile");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Fitness Tracker</h1>

      <button
        onClick={goToMyProfile}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>

      {/* Display Fitness Data */}
      <h2 className="text-xl font-bold mb-4">Your Fitness Data</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 px-4 py-2">Weight</th>
            <th className="border border-gray-200 px-4 py-2">Age</th>
            <th className="border border-gray-200 px-4 py-2">Sugar Level</th>
            <th className="border border-gray-200 px-4 py-2">Blood Pressure</th>
            <th className="border border-gray-200 px-4 py-2">Heart Rate</th>
            <th className="border border-gray-200 px-4 py-2">
              Cholesterol Level
            </th>
            <th className="border border-gray-200 px-4 py-2">
              Exercise Duration
            </th>
            <th className="border border-gray-200 px-4 py-2">Created At</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fitnessData.map((data) => (
            <tr key={data._id}>
              <td className="border border-gray-200 px-4 py-2">
                {data.weight}
              </td>
              <td className="border border-gray-200 px-4 py-2">{data.age}</td>
              <td className="border border-gray-200 px-4 py-2">
                {data.sugarLevel}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {data.bloodPressure}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {data.heartRate}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {data.cholesterolLevel}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {data.exerciseDuration}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                {new Date(data.createdAt).toLocaleString()}
              </td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => openModal(data)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  onClick={() => handleDelete(data._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Update Fitness Data"
      >
        <h2 className="text-xl font-bold mb-4">Update Fitness Data</h2>
        {currentData && (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <input
              type="number"
              name="weight"
              value={currentData.weight}
              onChange={handleChange}
              placeholder="Weight"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="age"
              value={currentData.age}
              onChange={handleChange}
              placeholder="Age"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="sugarLevel"
              value={currentData.sugarLevel}
              onChange={handleChange}
              placeholder="Sugar Level"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="text"
              name="bloodPressure"
              value={currentData.bloodPressure}
              onChange={handleChange}
              placeholder="Blood Pressure"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="heartRate"
              value={currentData.heartRate}
              onChange={handleChange}
              placeholder="Heart Rate"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="cholesterolLevel"
              value={currentData.cholesterolLevel}
              onChange={handleChange}
              placeholder="Cholesterol Level"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="exerciseDuration"
              value={currentData.exerciseDuration}
              onChange={handleChange}
              placeholder="Exercise Duration"
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 ml-2"
            >
              Cancel
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default FitnessTracker;

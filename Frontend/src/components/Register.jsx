import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/register", formData);
      alert("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login"); // Redirect after success
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {["username", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <div
                key={index}
                className="mb-4 flex items-center border border-gray-300 rounded-md px-3 py-2"
              >
                {field === "username" && (
                  <FaUser className="text-gray-600 mr-2" />
                )}
                {field === "email" && (
                  <FaEnvelope className="text-gray-600 mr-2" />
                )}
                {(field === "password" || field === "confirmPassword") && (
                  <FaLock className="text-gray-600 mr-2" />
                )}
                <input
                  type={field.includes("password") ? "password" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  required
                  className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-sm"
                />
              </div>
            )
          )}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md bg-blue-500 text-white font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

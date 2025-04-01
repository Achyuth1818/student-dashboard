import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

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
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData
      );
      // Store the token in localStorage
      localStorage.setItem("x-token", response.data.token);
      alert("Registration successful! Please login to continue.");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-0 px-0 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('./public/624111.webp')",
          filter: "blur(8px)",
        }}
      />
      <div className="max-w-md w-full p-8  shadow-lg rounded-lg mt-10 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white ">Create an Account</h2>
          <p className="mt-2 text-gray-700">
            Join our health-focused community today!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {["username", "email", "password", "confirmPassword"].map(
            (field, index) => (
              <div key={index} className="relative">
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  {field === "username" && (
                    <FaUser className="text-gray-400 mr-2" />
                  )}
                  {field === "email" && (
                    <FaEnvelope className="text-gray-400 mr-2" />
                  )}
                  {(field === "password" || field === "confirmPassword") && (
                    <FaLock className="text-gray-400 mr-2" />
                  )}
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    required
                    className="w-full focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            )
          )}

          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300`}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

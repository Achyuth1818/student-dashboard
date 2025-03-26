import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      });

      // Store the token in localStorage
      localStorage.setItem("x-token", response.data.token);

      alert("Login successful!");
      navigate("/myprofile");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className={`w-full py-2 text-white rounded-md ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { assets } from "../assets/frontend-assets/assets";
import axios from "axios";

const SignUp = () => {
  const url = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error if passwords match
    setError("");

    const res = await axios.post(`${url}/api/user/signup`, formData);
    setError(res.data.message);
    return res.data;
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col justify-center items-center scroll-auto py-10">
      <img src={assets.spotify_logo} alt="Spotify Logo" />
      <h1 className="text-4xl px-3 py-4 font-bold text-center text-white mb-4">
        Sign up to start listening
      </h1>

      <div className="flex flex-col justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-white"
        >
          {/* Username */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Username</p>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5"
              type="text"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Password</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Confirm Password</p>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5"
              type="password"
              placeholder="Re-enter password to confirm"
              required
            />
          </div>

          {/* Display Name */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Display Name</p>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(30vw,250px)]"
              type="text"
              placeholder="Enter display name"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm font-bold">{error}</p>}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="text-base bg-green-700 hover:bg-green-500 text-black py-2.5 px-14 cursor-pointer border-1 font-bold rounded-4xl"
          >
            Sign Up
          </button>
        </form>
      </div>
      <p className="text-white mt-4">
        Already have an account?{" "}
        <a href="/login" className="underline hover:text-green-500">
          Log in here
        </a>
      </p>
    </div>
  );
};

export default SignUp;

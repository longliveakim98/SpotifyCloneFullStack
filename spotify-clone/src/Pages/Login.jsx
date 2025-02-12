import { assets } from "../assets/frontend-assets/assets";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      localStorage.setItem("reloadOnce", "true");
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      const hasReloaded = localStorage.getItem("reloadOnce");

      if (hasReloaded) {
        // Remove the flag to prevent multiple reloads
        localStorage.removeItem("reloadOnce");
      } else {
        // Navigate to home and reload the page
        navigate("/");
        window.location.reload();
      }
    }
  }, [user, navigate]);
  return (
    <div className="bg-[#121212] min-h-screen flex flex-col justify-center items-center scroll-auto py-10">
      <img src={assets.spotify_logo} alt="Spotify Logo" />
      <h1 className="text-4xl px-3 py-4 font-bold text-center text-white mb-4">
        Log in to Spotify
      </h1>
      <div className="flex flex-col justify-center items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 text-white"
        >
          {/* Username */}
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Email</p>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5"
              type="text"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-sm">Password</p>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(30vw,250px)]"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="text-base bg-green-700 hover:bg-green-500 text-black py-2.5 px-14 cursor-pointer border-1 font-bold rounded-4xl"
          >
            Log in
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <p className="text-white mt-4">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="underline hover:text-green-400">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default Login;

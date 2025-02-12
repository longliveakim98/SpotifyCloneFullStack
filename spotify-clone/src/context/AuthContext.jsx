import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const url = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        getUser(decodedUser.userId);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove the broken token
        setUser(null); // Prevent crashing
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = async (id) => {
    try {
      const user = await axios.get(`${url}/api/user/user/${id}`);
      setUserDetail(user.data);
    } catch (error) {
      console.error("Failed to fetch user with id:", id, error);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);

      setUser(res.data.user);
      getUser(res.data.user._id);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userDetail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

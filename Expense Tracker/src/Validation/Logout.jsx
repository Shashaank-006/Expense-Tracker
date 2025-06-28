// src/Validation/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post("http://localhost:8000/tracker/logout/", {
          refresh_token: localStorage.getItem("refresh_token"),
        });
      } catch (error) {
        console.error("Logout error", error);
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/login");
    };

    logoutUser();
  }, [navigate]);

  return null;
};

export default Logout;


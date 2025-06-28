import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    full_name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();


    if (!form.username || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }


    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(form.email)) {
    //   setError("Enter a valid email address.");
    //   return;
    // }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/tracker/register/", {
        username: form.username,
        email: form.email,
        full_name: form.full_name,
        password: form.password,
      });

      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);

    }catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMsg = Object.values(errorData).flat().join(' ');
        setError(errorMsg);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  };

  return (
    <div className="auth-card">
      <div className="finsight-logo">FinSight</div>
      <h2>Register</h2>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username *"
          name="username"
          value={form.username}
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Email *"
          name="email"
          value={form.email}
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Full Name (Optional)"
          name="full_name"
          value={form.full_name}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password *"
          name="password"
          value={form.password}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Confirm Password *"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleInput}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;

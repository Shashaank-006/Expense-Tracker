import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/tracker/login/", {
        username: form.username,
        password: form.password,
      });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      {error && <div className="error-msg">{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleInput}
        />
        <button type="submit">Sign In</button>
      </form>
      <a href="/register">Don't have an account? Sign Up</a>
    </div>
  );
};

export default Login;

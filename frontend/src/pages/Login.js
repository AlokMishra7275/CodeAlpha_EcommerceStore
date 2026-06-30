import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://codealpha-ecommercestore-ypuy.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);

      alert("Login Successful ✅");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password ❌");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>🛍️ E-Commerce Store</h1>

        <h2>Welcome Back</h2>

        <p className="subtitle">
          Login to continue shopping
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="📧 Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔒 Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>

          </div>

          <div className="options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <span className="forgot">
              Forgot Password?
            </span>

          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
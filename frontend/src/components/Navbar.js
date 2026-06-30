import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ search, setSearch }) => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");

  window.location.href = "/login";
};

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🛍️ E-Commerce Store
      </Link>

      <input
        type="text"
        placeholder="🔍 Search products..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="nav-links">
  <Link to="/">Home</Link>
  <Link to="/cart">Cart</Link>
  <Link to="/orders">Orders</Link>

  {token ? (
  <>
    <span className="welcome-text">
      Hello, {userName}
    </span>

    <button className="logout-btn" onClick={logout}>
      Logout
    </button>
  </>
) : (
  <>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </>
)}
</div>
    </nav>
  );
};

export default Navbar;
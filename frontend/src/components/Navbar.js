import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ search, setSearch }) => {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="logo">
        🛍️ E-Commerce Store
      </div>

      <input
  type="text"
  placeholder="🔍 Search products..."
  className="search-box"
  value={search}
  onChange={(e) => {
    console.log("Typing:", e.target.value);
    setSearch(e.target.value);
  }}
/>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>

        {token ? (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
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
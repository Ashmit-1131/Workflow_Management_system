import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {!user && ( 
          <Link to="/" className="navbar-logo">
            Home
          </Link>
        )}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="navbar-profile"
            />
            <span className="navbar-user">
              Welcome, {user.displayName || user.email}
            </span>
            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">
              Login
            </Link>
            <Link to="/register" className="navbar-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

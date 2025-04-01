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
    await signOut(auth);
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">Home</Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <img
              src={user.photoURL || "https://via.placeholder.com/40"}
              alt="Profile"
              className="navbar-profile"
            />
            <span className="navbar-user">Welcome, {user.email}</span>
            <button className="navbar-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // When not logged in, no sign in buttons are displayed.
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

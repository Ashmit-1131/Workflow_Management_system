import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="home-container">
      <h1>Welcome to Workflow Management System</h1>
      {user ? (
        <h2>Logged in as {user.email}</h2>
      ) : (
        <div className="login-prompt">
          <p>Please log in to continue</p>
          <Link to="/login" className="login-button">
            Login to Continue
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

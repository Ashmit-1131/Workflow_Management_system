
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import WorkflowList from "./pages/WorkflowList";
import WorkflowEditor from "./pages/WorkflowEditor";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { loginUser, logoutUser } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Update the Redux store with the logged-in user details
        dispatch(loginUser(user));
      } else {
        // Clear the user details from the Redux store
        dispatch(logoutUser());
      }
    });

    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/workflows" element={<WorkflowList />} />
        <Route path="/workflows/create" element={<WorkflowEditor />} />
        <Route path="/workflows/:id/edit" element={<WorkflowEditor />} />
      </Routes>
    </Router>
  );
}

export default App;

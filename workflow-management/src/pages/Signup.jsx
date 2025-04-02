import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/authSlice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(loginUser(userCredential.user));
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;

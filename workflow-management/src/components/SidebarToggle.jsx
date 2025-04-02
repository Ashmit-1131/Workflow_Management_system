// src/components/SidebarToggle.jsx
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

const SidebarToggle = ({ onToggle }) => {
  return (
    <IconButton onClick={onToggle} edge="start" sx={{ mr: 2 }}>
      <MenuIcon />
    </IconButton>
  );
};

export default SidebarToggle;

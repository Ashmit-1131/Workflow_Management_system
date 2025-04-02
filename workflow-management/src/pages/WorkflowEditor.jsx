// src/pages/WorkflowEditor.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkflow,
  updateWorkflow,
  fetchWorkflowById,
  clearCurrentWorkflow,
} from "../store/workflowSlice";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import "./WorkflowEditor.css";

const WorkflowEditor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentWorkflow, loading } = useSelector((state) => state.workflow);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    if (id) {
      dispatch(fetchWorkflowById(id));
    } else {
      dispatch(clearCurrentWorkflow());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentWorkflow && id) {
      setName(currentWorkflow.name || "");
      setStatus(currentWorkflow.status || "Draft");
    }
  }, [currentWorkflow, id]);

  const handleSave = async () => {
    const workflowData = { name, status };
    if (id) {
      // Update existing workflow
      await dispatch(updateWorkflow({ id, updates: workflowData }));
    } else {
      // Create new workflow
      await dispatch(createWorkflow(workflowData));
    }
    navigate("/workflows");
  };

  return (
    <div className="workflow-editor-container">
      <Typography variant="h4">
        {id ? "Edit Workflow" : "Create Workflow"}
      </Typography>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="workflow-editor-form">
          <TextField
            label="Workflow Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Additional fields, flowchart, or step configuration can go here */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowEditor;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createWorkflow, updateWorkflow } from "../store/workflowSlice";

const WorkflowModal = ({ isOpen, onClose, workflow }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (workflow) {
      setName(workflow.name || "");
      setDescription(workflow.description || "");
    } else {
      setName("");
      setDescription("");
    }
  }, [workflow]);

  const handleSubmit = async () => {
    // Create a workflow data object with a timestamp for lastEditedOn
    const workflowData = {
      name,
      description,
      lastEditedOn: new Date().toLocaleString(),
    };

    if (workflow) {
      // Update existing workflow logic
      await dispatch(updateWorkflow({ id: workflow.id, updates: workflowData }));
    } else {
      // Create new workflow logic
      await dispatch(createWorkflow(workflowData));
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {workflow ? "Edit Workflow" : "Create New Workflow"}
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Workflow Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {workflow ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkflowModal;

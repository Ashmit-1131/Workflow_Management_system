import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkflows, deleteWorkflow } from "../store/workflowSlice";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";

// MUI Icons
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Custom Components
import SidebarToggle from "../components/SidebarToggle"; // Optional sidebar toggle
import WorkflowModal from "../components/WorkflowModal"; // For create/edit modal
import "./WorkflowList.css"; // Custom CSS

const WorkflowList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get workflows data and status from the Redux store
  const { workflows, loading, error } = useSelector((state) => state.workflow);

  // Local state for search input, modal control, and 3-dot menu handling
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorkflow, setEditWorkflow] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuWorkflowId, setMenuWorkflowId] = useState(null);

  // Fetch workflows when component mounts or when dispatch changes
  useEffect(() => {
    dispatch(fetchWorkflows());
  }, [dispatch]);

  // Filter workflows based on search input (by name or ID)
  const filteredWorkflows = workflows.filter((wf) =>
    wf.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wf.id?.toString().includes(searchTerm)
  );

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Open modal to create a new workflow
  const handleCreateNewProcess = () => {
    setEditWorkflow(null);
    setModalOpen(true);
  };

  // Open modal to edit an existing workflow
  const handleEdit = (workflow) => {
    setEditWorkflow(workflow);
    setModalOpen(true);
  };

  // Delete workflow with a confirmation prompt
  const handleDelete = (workflowId) => {
    if (window.confirm("Are you sure you want to delete this workflow?")) {
      dispatch(deleteWorkflow(workflowId));
    }
    handleMenuClose();
  };

  // Handlers for the 3-dot menu (for additional actions)
  const handleMenuOpen = (event, workflowId) => {
    setAnchorEl(event.currentTarget);
    setMenuWorkflowId(workflowId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuWorkflowId(null);
  };

  // Handler for the Execute button (navigate to execution or process page)
  const handleExecute = (workflowId) => {
    // For example, navigate to a dedicated execution page:
    navigate(`/workflows/${workflowId}/execute`);
  };

  return (
    <Box className="workflow-list-page">
      {/* Header Section: Sidebar toggle and Page Title */}
      <Box display="flex" alignItems="center" className="header-section">
        <SidebarToggle onToggle={() => console.log("Sidebar toggled")} />
        <Typography variant="h5" className="page-title">
          Workflow Builder
        </Typography>
      </Box>

      {/* Search Bar and Create Button */}
      <Box className="search-and-create">
        <TextField
          size="small"
          placeholder="Search By Workflow Name/ID"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateNewProcess}
          className="create-btn"
        >
          + Create New Process
        </Button>
      </Box>

      {/* Workflows Table */}
      <TableContainer component={Paper} className="workflow-table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header-row">
              <TableCell>Workflow Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Last Edited On</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Star</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Show a loading spinner when fetching workflows */}
            {loading && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
            {/* Show error message if there's an error */}
            {error && (
              <TableRow>
                <TableCell colSpan={6} align="center" style={{ color: "red" }}>
                  {error}
                </TableCell>
              </TableRow>
            )}
            {/* Map through filtered workflows */}
            {filteredWorkflows.map((workflow) => (
              <TableRow key={workflow.id} className="workflow-row">
                <TableCell>{workflow.name || "Workflow Name here..."}</TableCell>
                <TableCell>#{workflow.id || "N/A"}</TableCell>
                <TableCell>
                  {workflow.lastEditedOn || "Not Specified"}
                </TableCell>
                <TableCell>
                  {workflow.description?.length > 30
                    ? workflow.description.substring(0, 30) + "..."
                    : workflow.description || "Some Description..."}
                </TableCell>
                <TableCell align="center">
                  {workflow.isStarred ? (
                    <StarIcon sx={{ color: "#ffb400" }} />
                  ) : (
                    <StarBorderIcon />
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleExecute(workflow.id)}
                  >
                    Execute
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    onClick={() => handleEdit(workflow)}
                  >
                    Edit
                  </Button>
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, workflow.id)}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={menuWorkflowId === workflow.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleDelete(workflow.id)}>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => console.log("Additional action for", workflow.id)}>
                      <KeyboardArrowDownIcon />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
            {/* If no workflows match the search criteria, display a message */}
            {filteredWorkflows.length === 0 && !loading && !error && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No workflows found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Workflow Modal */}
      {modalOpen && (
        <WorkflowModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          workflow={editWorkflow}
        />
      )}
    </Box>
  );
};

export default WorkflowList;

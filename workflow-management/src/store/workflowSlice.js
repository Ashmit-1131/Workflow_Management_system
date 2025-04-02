import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; // Firebase database instance
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Async thunk to fetch all workflows
export const fetchWorkflows = createAsyncThunk(
  "workflow/fetchWorkflows",
  async (_, { rejectWithValue }) => {
    try {
      const colRef = collection(db, "workflows");
      const snapshot = await getDocs(colRef);
      const data = [];
      snapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...docSnap.data() });
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch a single workflow by ID for editing or viewing details
export const fetchWorkflowById = createAsyncThunk(
  "workflow/fetchWorkflowById",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "workflows", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return rejectWithValue("Workflow not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create a new workflow
export const createWorkflow = createAsyncThunk(
  "workflow/createWorkflow",
  async (workflowData, { rejectWithValue }) => {
    try {
      const colRef = collection(db, "workflows");
      const docRef = await addDoc(colRef, workflowData);
      return { id: docRef.id, ...workflowData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update an existing workflow
export const updateWorkflow = createAsyncThunk(
  "workflow/updateWorkflow",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "workflows", id);
      await updateDoc(docRef, updates);
      return { id, ...updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a workflow
export const deleteWorkflow = createAsyncThunk(
  "workflow/deleteWorkflow",
  async (id, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "workflows", id);
      await deleteDoc(docRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Define the workflow slice with initial state and reducers
const workflowSlice = createSlice({
  name: "workflow",
  initialState: {
    workflows: [],
    currentWorkflow: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer to clear the current workflow from state
    clearCurrentWorkflow: (state) => {
      state.currentWorkflow = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchWorkflows actions
      .addCase(fetchWorkflows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkflows.fulfilled, (state, action) => {
        state.loading = false;
        state.workflows = action.payload;
      })
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchWorkflowById actions
      .addCase(fetchWorkflowById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWorkflowById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWorkflow = action.payload;
      })
      .addCase(fetchWorkflowById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle createWorkflow action; add the new workflow to the state array
      .addCase(createWorkflow.fulfilled, (state, action) => {
        state.workflows.push(action.payload);
      })
      // Handle updateWorkflow action; update the workflow in the state array
      .addCase(updateWorkflow.fulfilled, (state, action) => {
        const index = state.workflows.findIndex(
          (wf) => wf.id === action.payload.id
        );
        if (index !== -1) {
          state.workflows[index] = action.payload;
        }
      })
      // Handle deleteWorkflow action; remove the workflow from the state array
      .addCase(deleteWorkflow.fulfilled, (state, action) => {
        state.workflows = state.workflows.filter(
          (wf) => wf.id !== action.payload
        );
      });
  },
});

export const { clearCurrentWorkflow } = workflowSlice.actions;
export default workflowSlice.reducer;

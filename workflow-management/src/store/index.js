import { configureStore } from "@reduxjs/toolkit";
import workflowReducer from "./workflowSlice";
import authReducer from "./authSlice"; // if you have an auth slice

const store = configureStore({
  reducer: {
    workflow: workflowReducer, // This key should match what you use in useSelector
    auth: authReducer,
    // ... other reducers
  },
});

export default store;

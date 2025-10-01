import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import badgeReducer from "../features/badges/slices/badgeSlice";
import { authApiSlice } from "../api/authApiSlice";
import { badgeApiSlice } from "../api/badgeApiSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  badge: badgeReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [badgeApiSlice.reducerPath]: badgeApiSlice.reducer,
});

export default rootReducer;

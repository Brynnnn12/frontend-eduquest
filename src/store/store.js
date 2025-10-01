import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApiSlice } from "../api/authApiSlice";
import { badgeApiSlice } from "../api/badgeApiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      badgeApiSlice.middleware
    ),
});

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApiSlice } from "../api/authApiSlice";
import { badgeApiSlice } from "../api/badgeApiSlice";
import { characterApi } from "../api/characterApiSlice";
import { missionApi } from "../api/missionApiSlice";
import { quizApi } from "../api/quizApiSlice";
import { progressApi } from "../api/progressApiSlice";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApiSlice.middleware,
      badgeApiSlice.middleware,
      characterApi.middleware,
      missionApi.middleware,
      quizApi.middleware,
      progressApi.middleware
    ),
});

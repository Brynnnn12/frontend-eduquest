import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import badgeReducer from "../features/badges/slices/badgeSlice";
import characterReducer from "../features/characters/slices/characterSlice";
import { authApiSlice } from "../api/authApiSlice";
import { badgeApiSlice } from "../api/badgeApiSlice";
import { characterApi } from "../api/characterApiSlice";
import missionReducer from "../features/missions/slices/missionSlice";
import { missionApi } from "../api/missionApiSlice";
import { quizApi } from "../api/quizApiSlice";
import quizReducer from "../features/quiz/slices/quizSlice";
import { progressApi } from "../api/progressApiSlice";
import progressReducer from "../features/progress/slices/progressSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  badge: badgeReducer,
  character: characterReducer,
  mission: missionReducer,
  quiz: quizReducer,
  progress: progressReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [badgeApiSlice.reducerPath]: badgeApiSlice.reducer,
  [characterApi.reducerPath]: characterApi.reducer,
  [missionApi.reducerPath]: missionApi.reducer,
  [quizApi.reducerPath]: quizApi.reducer,
  [progressApi.reducerPath]: progressApi.reducer,
});

export default rootReducer;

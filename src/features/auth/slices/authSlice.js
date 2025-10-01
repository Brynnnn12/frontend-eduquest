import { createSlice } from "@reduxjs/toolkit";
import { removeToken } from "../../../api/tokenHelpers";

// Initialize state from localStorage
function getInitialState() {
  const token = localStorage.getItem("accessToken");
  const userString = localStorage.getItem("user");
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch {
      // If not JSON, assume it's name string, convert to object
      user = { name: userString };
    }
  }
  return {
    user,
    token,
    loading: false,
    error: null,
  };
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Logout: clear user, token, and localStorage
    logout: (state) => {
      state.user = null;
      state.token = null;
      removeToken();
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logout, setCredentials, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;

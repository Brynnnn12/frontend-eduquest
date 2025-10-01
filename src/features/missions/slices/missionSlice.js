import { createSlice } from "@reduxjs/toolkit";

const missionSlice = createSlice({
  name: "mission",
  initialState: {
    missions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMissions: (state, action) => {
      state.missions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMissions, setLoading, setError } = missionSlice.actions;
export default missionSlice.reducer;

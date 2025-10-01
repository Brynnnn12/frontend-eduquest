import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
  name: "progress",
  initialState: {
    progresses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProgresses: (state, action) => {
      state.progresses = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProgresses, setLoading, setError } = progressSlice.actions;
export default progressSlice.reducer;

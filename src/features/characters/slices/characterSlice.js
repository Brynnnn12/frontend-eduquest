import { createSlice } from "@reduxjs/toolkit";

const characterSlice = createSlice({
  name: "character",
  initialState: {
    character: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCharacter: (state, action) => {
      state.character = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCharacter, setLoading, setError } = characterSlice.actions;
export default characterSlice.reducer;

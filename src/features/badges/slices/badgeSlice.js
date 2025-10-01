import { createSlice } from "@reduxjs/toolkit";

const badgeSlice = createSlice({
  name: "badge",
  initialState: {
    selectedBadge: null,
    isFormOpen: false,
  },
  reducers: {
    setSelectedBadge: (state, action) => {
      state.selectedBadge = action.payload;
    },
    openForm: (state) => {
      state.isFormOpen = true;
    },
    closeForm: (state) => {
      state.isFormOpen = false;
      state.selectedBadge = null;
    },
  },
});

export const { setSelectedBadge, openForm, closeForm } = badgeSlice.actions;
export default badgeSlice.reducer;

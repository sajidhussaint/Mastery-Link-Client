import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  module: null,
  chapter: [],
};

const selectedModuleSlice = createSlice({
  name: "selectedModuleSlice",
  initialState,
  reducers: {
    selectModule(state, action) {
      state.module = action.payload;
    },
    selectChapter(state, action) {
      state.chapter = action.payload;
    },
  },
});

export default selectedModuleSlice.reducer;
export const selectModuleActions = selectedModuleSlice.actions;

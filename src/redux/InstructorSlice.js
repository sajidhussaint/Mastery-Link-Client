import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructor: null,
  instructorEmail: null,
};

const instructorSlice = createSlice({
  name: "instructorSlice",
  initialState,
  reducers: {
    saveInstructor(state, action) {
      state.instructor = action.payload;
    },
    instructorLogout(state) {
      state.instructor = null;
    },
    setEmail(state, action) {
      state.instructorEmail = action.payload;
    },
  },
});

export default instructorSlice.reducer;
export const instructorActions = instructorSlice.actions;

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  course: null,
  module: null
}

const selectedCourseSlice = createSlice({
  name: "selectedCourseSlice",
  initialState,
  reducers: {
    selectCourse(state, action) {
      state.course = action.payload
    },
    addModule(state, action) {
      state.course = {
        ...state.course,
        progression: [...(state.course?.progression || []), action.payload]
      }
    },
    addNote(state, action) {
      state.course = {
        ...state.course,
        notes: [...(state.course?.notes || []), action.payload]
      }
    },
    selectModule(state, action) {
      state.module = action.payload
    }
  }
})

export default selectedCourseSlice.reducer
export const selectCourseActions = selectedCourseSlice.actions

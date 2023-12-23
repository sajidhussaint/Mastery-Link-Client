import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  admin: null
}

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    saveAdmin(state, action) {
      state.admin = action.payload
    },
    adminLogout(state) {
      ;(state.admin = null)
    }
  }
})

export default adminSlice.reducer
export const adminActions = adminSlice.actions
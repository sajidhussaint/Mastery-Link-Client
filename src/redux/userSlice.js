import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userEmail: null,
  user: null
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.userEmail = action.payload
    },

    saveUser(state, action) {
      state.user = action.payload
    },

    addCourse(state, action) {
      state.user?.courses?.push(action.payload)
      // state.user?.courses=action.payload
    },

    userLogout(state) {
      ;(state.user = null), (state.userEmail = null)
    }
  }
})

export default userSlice.reducer
export const userActions = userSlice.actions

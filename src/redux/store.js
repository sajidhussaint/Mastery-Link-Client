import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import adminReducer from "./adminSlice"
import instructorReducer from "./InstructorSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage
}

const persistUserReducer = persistReducer(persistConfig, userReducer)
const persistAdminReducer = persistReducer(persistConfig, adminReducer)
const persistInstructorReducer = persistReducer(persistConfig, instructorReducer)

const store = configureStore({
  reducer: {
    user: persistUserReducer,
    admin: persistAdminReducer,
    instructor: persistInstructorReducer,
  }
})

export const persistor = persistStore(store)
export default store

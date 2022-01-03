import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'
import tagsReducer from './slices/tagSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    tags: tagsReducer,
  },
})

export default store

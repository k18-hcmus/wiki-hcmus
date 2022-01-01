import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoginOpen: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLoginForm(state) {
      state.isLoginOpen = !state.isLoginOpen
    },
  },
})

// Selectors
export const getIsLoginOpen = (state) => state.auth.isLoginOpen
// Reducers and actions
const { actions, reducer } = authSlice

export const { toggleLoginForm } = actions

export default reducer

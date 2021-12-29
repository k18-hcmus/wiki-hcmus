import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../axiosClient'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosClient.get('/users/me')
    return response.data
  } catch (error) {
    console.log(error.response)
  }
})
const initialState = {
  user: {},
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogged = true
      state.user = action.payload
    },
    userLogout: (state) => {
      state.user = undefined
      state.isLogged = false
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload
      state.isLogged = true
    },
  },
})

// Selectors
export const getUser = (state) => state.user.user
export const getUserAuth = (state) => state.user.isLogged

// Reducers and actions
const { actions, reducer } = userSlice

export const { userLogin, userLogout } = actions

export default reducer

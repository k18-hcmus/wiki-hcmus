import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../axiosClient'

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosClient.get('/users/me')
    const accountUser = await axiosClient.get(`/account-users/${response.data.DetailUser}`)
    return {
      user: response.data,
      accUser: accountUser.data
    }
  } catch (error) {
    console.log(error.response)
  }
})
const initialState = {
  user: {},
  accUser: {},
  isLogged: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      // param obj {user , accUser}
      state.isLogged = true
      state.user = action.payload.user
      state.accUser = action.payload.accUser
    },
    userLogout: (state) => {
      state.user = undefined
      state.accUser = undefined
      state.isLogged = false
    },
    userUpdateDetail: (state) => {
      console.log(action.payload)
      state.accUser = action.payload
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.accUser = action.payload.accUser
      state.isLogged = true
    },
  },
})

// Selectors
export const getUser = (state) => state.user.user
export const getUserAuth = (state) => state.user.isLogged
export const getAccUser = (state) => state.user.accUser
// Reducers and actions
const { actions, reducer } = userSlice

export const { userLogin, userLogout, userUpdateDetail } = actions

export default reducer

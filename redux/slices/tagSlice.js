import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from '../../axiosClient'
import { TAG_STATUS } from '../../shared/tag-constant'

export const fetchTags = createAsyncThunk('tag/fetchTag', async () => {
  try {
    const response = await axiosClient.get('/tags')
    const tagArr = response.data.filter((tag) => tag.Status == TAG_STATUS.PUBLISH)
    console.log('Tag', tagArr, response.data)
    return tagArr
  } catch (error) {
    console.log(error.response)
  }
})
const initialState = {
  tags: {},
}

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    updateTags: (state, action) => {
      state.tags = action.payload
    },
  },
  extraReducers: {
    [fetchTags.fulfilled]: (state, action) => {
      state.tags = action.payload
    },
  },
})

// Selectors
export const getTags = (state) => state.tags.tags
// Reducers and actions
const { actions, reducer } = tagsSlice

export const { updateTags } = actions

export default reducer

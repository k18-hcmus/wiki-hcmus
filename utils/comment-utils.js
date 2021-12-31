import axiosClient from '../axiosClient'

export const addNewComment = (commentContent) => axiosClient.post('/comments', commentContent)

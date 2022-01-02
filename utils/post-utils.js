import axiosClient from '../axiosClient'

export const getPostById = async (id) => axiosClient.get(`/posts/${id}`)

export const getCommentsByPostId = async (postId) => axiosClient.get(`/posts/${postId}/comments`)

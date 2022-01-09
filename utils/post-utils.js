import axiosClient from '../axiosClient'
import { STATUS_POST } from '../shared/constants'
import get from 'lodash/get'
export const getPostById = async (id) => axiosClient.get(`/posts/${id}`)

export const getCommentsByPostId = async (postId) => axiosClient.get(`/posts/${postId}/comments`)

export const validViewPost = (user, userPostId, Status) => {
  //userPostId is who created post
  const userid = get(user, 'DetailUser', '') || get(user, 'DetailUser.id', '')
  if (
    user.role.name !== 'Moderator' &&
    user.role.name !== 'Adminstrator' &&
    userid !== userPostId.id &&
    Status !== STATUS_POST.Publish.value
  ) {
    return false
  }
  return true
}

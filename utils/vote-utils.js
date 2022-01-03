import { VOTE_CONST } from '../shared/constants'
import axiosClient from '../axiosClient'

export const upvote = async (type, id) => {
  const resultData = await axiosClient.get(`${type.url}?id=${id}`)
  if (!resultData || resultData.data.length === 0) {
    console.log(`upvote failed with type=${type.context} and id=${id}`)
    return
  }
  const currentUpvote = resultData.data[0].UpvoteCount
  const newData = {
    UpvoteCount: currentUpvote + 1,
  }
  const result = await axiosClient({
    method: 'put',
    url: `${type.url}/${id}`,
    data: newData,
    headers: {},
  })
  if (result.statusCode !== 200) console.log(result)
}

export const downvote = async (type, id) => {
  const resultData = await axiosClient.get(`${type.url}?id=${id}`)
  if (!resultData || resultData.data.length === 0) {
    console.log(`downvote failed with type=${type.context} and id=${id}`)
    return
  }
  const currentDownvote = resultData.data[0].DownvoteCount
  const newData = {
    DownvoteCount: currentDownvote + 1,
  }
  const result = await axiosClient({
    method: 'put',
    url: `${type.url}/${id}`,
    data: newData,
    headers: {},
  })
  if (result.statusCode !== 200) console.log(result)
}

export const getUserTotalVote = async (type, user) => {
  var data
  var upvoteSum = 0
  var downvoteSum = 0
  if (type === 'id') {
    const userData = await axiosClient.get(`/account-users?id=${user}`)
    if (!userData || userData.data.length === 0) {
      console.log(`getUserTotalVote failed with userId=${user}`)
      return
    }
    data = userData.data[0]
  } else {
    data = user
  }
  data.Posts.forEach((post) => {
    upvoteSum += post.UpvoteCount
    downvoteSum += post.DownvoteCount
  })
  data.Comments.forEach((comment) => {
    upvoteSum += comment.UpvoteCount
    downvoteSum += comment.DownvoteCount
  })
  return [upvoteSum, downvoteSum]
}

// Current separate with getUserTotalVote for readability, maybe merge later
export const getTagTotalVote = async (type, tag) => {
  var data
  var upvoteSum = 0
  var downvoteSum = 0
  if (type === 'id') {
    const tagData = await axiosClient.get(`/tags?id=${tag}`)
    if (!userData || tagData.data.length === 0) {
      console.log(`getTagTotalVote failed with tagId=${tag}`)
      return
    }
    data = tagData.data[0]
  } else {
    data = tag
  }
  data.Posts.forEach((post) => {
    upvoteSum += post.UpvoteCount
    downvoteSum += post.DownvoteCount
  })
  // Should we consider all comments' vote of each post when calculating?
  return [upvoteSum, downvoteSum]
}

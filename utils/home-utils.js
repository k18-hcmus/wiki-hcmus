import axiosClient from '../axiosClient'

export const getPosts = async () => {
  const postResult = await axiosClient.get("/posts")
  if (postResult.length !== 0) {
    console.log("Get post success")
    return postResult
  } else {
    console.log("Get post failure")
    return []
  }
}

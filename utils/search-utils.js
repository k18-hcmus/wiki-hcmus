import axiosClient from '../axiosClient'

export const resultSearch = async (search) => {

    const checkPost = (post) => {
        let isTrue = false
        if (post.Title.indexOf(search.post) > -1)
            return true
        post.Tags.forEach((tag) => {
            if (tag.Name.indexOf(search.post) > -1) {
                isTrue = true
            }
        })
        if (post.User !== null) {
            if (post.User.DisplayName.indexOf(search.post) > -1)
                isTrue = true
        }
        return isTrue
    }

    const data = await axiosClient.get("/posts")
    let result = []
    const postResults = data.data
    if (postResults.length !== 0) {
        result = postResults.filter(checkPost)
    }
    return result
}

export const resultUserSearch = async (search) => {
    const checkUser = (user) => {
        let isTrue = false
        if (user !== null) {
            if (user.DisplayName.indexOf(search.post) > -1)
                isTrue = true
        }
        return isTrue
    }

    const data = await axiosClient.get("/account-users")
    let result = []
    const users = data.data
    if (users.length !== 0) {
        result = users.filter(checkUser)
    }
    return result
}

export const resultTagSearch = async (search) => {
    const checkTag = (tag) => {
        let isTrue = false
        if (tag.Name.indexOf(search.post) > -1) {
            isTrue = true
        }
        return isTrue
    }

    const data = await axiosClient.get("/tags")
    let result = []
    const tags = data.data
    if (tags.length !== 0) {
        result = tags.filter(checkTag)
    }
    return result
}
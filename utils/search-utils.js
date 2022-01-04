import axiosClient from '../axiosClient'


export const resultSearch = async (search) => {

    const checkTitle = (post) => {
        return (post.Title.indexOf(search.title) > -1)
    }

    const checkTag = (postResult) => {
        let isTrue = false
        postResult.Tags.forEach((tag) => {
            if (tag.Name.indexOf(search.tag) > -1) {
                isTrue = true
            }
        })
        return isTrue
    }

    const checkUser = (postResult) => {
        let isTrue = false
        if (postResult.User !== null) {
            if (postResult.User.DisplayName.indexOf(search.userName) > -1)
                isTrue = true
        }
        return isTrue
    }

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
        if (search.hasOwnProperty('title')) {
            result = postResults.filter(checkTitle)
        } else {
            if (search.hasOwnProperty('tag')) {
                result = postResults.filter(checkTag)
            } else {
                if (search.hasOwnProperty('userName')) {
                    result = postResults.filter(checkUser)
                }
                else {
                    result =postResults.filter(checkPost)
                    console.log(result)
                }
            }
        }
    }
    return result
}
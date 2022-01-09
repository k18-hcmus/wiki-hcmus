import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import isEmpty from 'lodash/isEmpty'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AbstractPost from '../../components/commons/abstract-post'
import { getAccUser, getUser } from '../../redux/slices/userSlice'
import { ROLE_STATUS } from '../../shared/moderator-constants'

const HorizoneFeature = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const PostResultSearch = ({ posts = [] }) => {
  const [ownUserData, setOwnUserData] = useState({
    id: null,
    FollowUsers: [],
  })
  const userDataObject = useSelector(getAccUser)
  useEffect(() => {
    if (userDataObject && Object.keys(userDataObject).length !== 0) {
      setOwnUserData(userDataObject)
    }
  }, [userDataObject])
  const [isAdmin, setIsAdmin] = useState(false)
  const userState = useSelector(getUser)
  useEffect(() => {
    if (!isEmpty(userState)) {
      if (userState.role.id.toString() === ROLE_STATUS.ADMINSTRATOR.value) {
        setIsAdmin(true)
      }
    }
  }, [userState])

  const deletePost = (postId) => {
    setOverviewData(overviewData.filter((post) => (post.id = postId)))
  }
  return (
    posts.length !== 0 && (
      <HorizoneFeature>
        {posts.length !== 0 &&
          posts.map((post, index) => (
            <AbstractPost
              key={index}
              data={post}
              ownUserId={ownUserData.id}
              isAdmin
              deletePost={deletePost}
            />
          ))}
      </HorizoneFeature>
    )
  )
}

export default PostResultSearch

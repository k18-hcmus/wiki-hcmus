import { Box, Button, Card, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import PostNoImageCard from './post-no-image-card'
import LinearProgress from '@mui/material/LinearProgress'
import SortPost from '../commons/sort-post-controller'
import axiosClient from '../../axiosClient'
import { POST_CONST } from '../../shared/post-constants'
import { VIEWOTHER_CONST } from '../../shared/profile-constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import { ROLE_STATUS } from '../../shared/moderator-constants'
import isEmpty from 'lodash/isEmpty'

const HorizoneFeature = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const BackToTopButton = styled(Button)({
  width: '200px',
  height: '40px',
  borderRadius: '15px',
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  zIndex: 10,
})
const ListBriefPost = () => {
  const [postsData, setPostsData] = useState([])
  const [visible, setVisible] = useState(false)
  const [dataOrder, setDataOrder] = useState(POST_CONST.DATA_ORDER.NEW)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [start, setStart] = useState(0)
  const [isloading, setIsloading] = useState(false)
  const limit = VIEWOTHER_CONST.LIMIT_VIEW
  const getMoreData = async () => {
    try {
      const newStart = start + limit
      setStart(newStart)
      const postResult = await axiosClient.get(
        `/posts/publish?&_start=${newStart}&_limit=${limit}&${dataOrder}`
      )
      if (postResult.data.length === 0) setHasMoreData(false)
      else setPostsData([...postsData, ...postResult.data])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newStart = 0
        setStart(newStart)
        setHasMoreData(true)
        const result = await axiosClient.get(
          `/posts/publish?&_start=${newStart}&_limit=${limit}&${dataOrder}`
        )
        setPostsData(result.data)
      } catch {
        console.log('Error get Post at Home')
      }
    }
    fetchData()
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true)
        const newStart = 0
        setStart(newStart)
        setHasMoreData(true)
        const result = await axiosClient.get(
          `/posts/publish?&_start=${newStart}&_limit=${limit}&${dataOrder}`
        )
        setPostsData(result.data)
      } catch {
        console.log('Error get Post at Home')
      } finally {
        setIsloading(false)
      }
    }
    fetchData()
  }, [dataOrder])
  const scrollToTop = () => {
    scroll.scrollToTop()
  }
  const [checked, setChecked] = useState([true, false, false])
  const options = ['new', 'hot', 'best']
  const handleDataOptionChange = (option) => {
    switch (option) {
      case 'hot':
        setDataOrder(POST_CONST.DATA_ORDER.HOT)
        break
      case 'new':
        setDataOrder(POST_CONST.DATA_ORDER.NEW)
        break
      case 'best':
        setDataOrder(POST_CONST.DATA_ORDER.BEST)
        break
    }
  }
  const handleCheck = (event) => {
    const id = parseInt(event.target.id)
    const newChecked = checked.fill(false)
    newChecked[id] = true
    setChecked(newChecked)
    handleDataOptionChange(options[id])
  }

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
    setPostsData(postsData.filter((post) => post.id === postId))
  }
  const renderPosts = (
    <>
      <InfiniteScroll
        dataLength={postsData.length}
        next={getMoreData}
        hasMore={hasMoreData}
        loader={<LinearProgress />}
      >
        <HorizoneFeature>
          {postsData.map((post, index) =>
            isAdmin ? (
              <PostNoImageCard deletePost={deletePost} key={index} post={post} isAdmin />
            ) : (
              <PostNoImageCard deletePost={deletePost} key={index} post={post} />
            )
          )}
          {visible && (
            <BackToTopButton color="primary" variant="contained" onClick={scrollToTop}>
              Back To Top
            </BackToTopButton>
          )}
        </HorizoneFeature>
      </InfiniteScroll>
    </>
  )
  return (
    <>
      <SortPost checked={checked} handleCheck={handleCheck} />
      {isloading ? <LinearProgress /> : renderPosts}
    </>
  )
}

export default ListBriefPost

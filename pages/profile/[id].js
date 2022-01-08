import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Tab, Tabs, Typography, Grid } from '@mui/material'
import LazyLoad from 'react-lazyload'
import UserInfo from '../../components/profile/view-other/user-info'
import Overview from '../../components/profile/view-other/overview'
import TabPanel from '../../components/profile/commons/tab-panel'
import { getTotalContribution } from '../../utils/contribution-utils'
import axiosClient from '../../axiosClient'
import { CONTRIBUTION_CONST, VIEWOTHER_CONST, POST_CONST } from '../../shared/constants'
import { getAccUser, fetchUser, getUser } from '../../redux/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import SortPost from '../../components/commons/sort-post-controller'
import { getUserTier } from '../../utils/contribution-utils'
import { styled } from '@mui/material/styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import LinearProgress from '@mui/material/LinearProgress'
import AbstractPost from '../../components/commons/abstract-post'
import isEmpty from 'lodash/isEmpty'
import { ROLE_STATUS } from '../../shared/moderator-constants'
const HorizoneFeature = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})
const Profile = () => {
  const [value, setValue] = React.useState(0)
  const router = useRouter()
  const { id } = router.query
  const [userData, setUserData] = useState({
    AvatarURL: '/static/avatars/avatar_1.jpg',
    Posts: [],
    Comments: [],
    PostVotes: [],
  })
  const [overviewData, setOverviewData] = useState([])
  const [hasMoreData, setHasMoreData] = useState(true)
  const [start, setStart] = useState(0)
  const limit = VIEWOTHER_CONST.LIMIT_VIEW
  const [dataOrder, setDataOrder] = useState(POST_CONST.DATA_ORDER.HOT)
  const [checked, setChecked] = useState([true, false, false])
  const [isloading, setIsloading] = useState(false)
  const dispatch = useDispatch()
  const options = ['new', 'hot', 'best']
  const getMoreData = async () => {
    if (!id) return
    try {
      const newStart = start + limit
      setStart(newStart)
      const postResult = await axiosClient.get(
        `/posts/publish?User.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
      )
      if (postResult.data.length === 0) setHasMoreData(false)
      else {
        setOverviewData([...overviewData, ...postResult.data])
        setHasMoreData(true)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
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
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return
        setIsloading(true)
        const newStart = 0
        setStart(newStart)
        const postResult = await axiosClient.get(
          `/posts/publish?User.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
        )
        if (postResult.data.length === 0) setHasMoreData(false)
        else {
          setHasMoreData(true)
          setOverviewData(postResult.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsloading(false)
      }
    }
    fetchData()
  }, [dataOrder])
  useEffect(() => {
    async function fetchData() {
      try {
        const results = await axiosClient.get(`/account-users?id=${id}`)
        var userObject = results.data[0]
        const totalCP = await getTotalContribution('object', userObject)
        var [currentTier, nextTierCP] = getUserTier(totalCP)
        userObject = {
          ...userObject,
          totalCP: totalCP,
          tier: currentTier,
          followerNum: userObject.FollowedByUsers.length,
          email: 'tnhan.18062000@gmail.com',
        }
        setUserData(userObject)
        const postResult = await axiosClient.get(
          `/posts/publish?User.id=${id}&_start=${start}&_limit=${limit}&${POST_CONST.DATA_ORDER.HOT}`
        )
        if (postResult.data.length === 0) setHasMoreData(false)
        else {
          setHasMoreData(true)
          setOverviewData(postResult.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (id) fetchData()
  }, [id])
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
  const updateReduxUserDetail = () => {
    dispatch(fetchUser())
  }
  const deletePost = (postId) => {
    setOverviewData(overviewData.filter(post => post.id = postId))
  }
  const renderPosts = (
    <>
      <InfiniteScroll
        dataLength={overviewData.length}
        next={getMoreData}
        hasMore={hasMoreData}
        loader={<LinearProgress />}
      >
        <HorizoneFeature sx={{ px: 1 }}>
          {isAdmin &&
            overviewData.map((post, index) => (
              <AbstractPost deletePost={deletePost} key={index} data={post} ownUserId={ownUserData.id} isAdmin />
            ))}
          {!isAdmin &&
            overviewData.map((post, index) => (
              <AbstractPost deletePost={deletePost} key={index} data={post} ownUserId={ownUserData.id} />
            ))}
        </HorizoneFeature>
      </InfiniteScroll>
    </>
  )
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={9} md={9} xl={9} xs={12}>
          <SortPost checked={checked} handleCheck={handleCheck} />
          {isloading ? <LinearProgress /> : renderPosts}
        </Grid>
        <Grid item lg={3} md={3} xl={3} xs={12}>
          <Box sx={{ pt: 2 }}>
            <UserInfo
              data={userData}
              setdata={setUserData}
              ownUserData={ownUserData}
              callbackUpdateUserData={updateReduxUserDetail}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile

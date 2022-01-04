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
import { getAccUser, fetchUser } from '../../redux/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getUserTier } from '../../utils/contribution-utils'

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
  const getMoreData = async () => {
    if (!id) return
    try {
      const newStart = start + limit
      setStart(newStart)
      const postResult = await axiosClient.get(
        `/posts?User.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
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
  const handleOverviewChange = (option) => {
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
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return
        const newStart = 0
        setStart(newStart)
        const postResult = await axiosClient.get(
          `/posts?User.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
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
          `/posts?User.id=${id}&_start=${start}&_limit=${limit}&${POST_CONST.DATA_ORDER.HOT}`
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
  const updateReduxUserDetail = () => {
    useDispatch(fetchUser())
  }
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={9} md={9} xl={9} xs={12}>
          <Box>
            <LazyLoad once={true}>
              <TabPanel value={value} index={0}>
                <Overview
                  data={overviewData}
                  ownUserId={ownUserData.id}
                  callbackSetDataOption={handleOverviewChange}
                  callbackLoadData={getMoreData}
                  hasMoreData={hasMoreData}
                />
              </TabPanel>
            </LazyLoad>
          </Box>
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

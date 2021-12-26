import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Container, Tab, Tabs, Typography, Grid } from '@mui/material'
import LazyLoad from 'react-lazyload'
import UserInfo from '../../components/profile/view-other/user-info'
import Overview from '../../components/profile/view-other/overview'
import Posts from '../../components/profile/view-other/posts'
import TabPanel from '../../components/profile/commons/tab-panel'
import { getTotalContribution } from '../../utils/contribution-utils'
import axiosClient from '../../axiosClient'
import { CONTRIBUTION_CONST } from '../../shared/constants'

const Profile = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const router = useRouter()
  const { id } = router.query
  const [userData, setUserData] = useState({
    AvatarURL: null,
  })
  const [overviewData, setOverviewData] = useState([])
  const handleOverviewChange = (option) => {
    switch (option) {
      case 'hot':
        break
      case 'new':
        break
      case 'best':
        break
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const results = await axiosClient.get(`/account-users?id=${id}`)
        var userObject = results.data[0]
        const totalCP = await getTotalContribution('object', userObject)
        var currentTier = 'Untiered'
        for (const tierName in CONTRIBUTION_CONST.TIER) {
          if (totalCP < CONTRIBUTION_CONST.TIER[tierName]) {
            break
          } else currentTier = tierName
        }
        userObject = {
          ...userObject,
          totalCP: totalCP,
          tier: currentTier,
          followerNum: userObject.FollowedByUsers.length,
          email: 'tnhan.18062000@gmail.com',
        }
        setUserData(userObject)
        const postResult = await axiosClient.get(`/posts?User.id=${id}`)
        setOverviewData(postResult.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" />
          <Tab label="Posts" />
        </Tabs>
      </Box>
      <Grid container spacing={3}>
        <Grid item lg={9} md={9} xl={9} xs={12}>
          <Box>
            <LazyLoad once={true}>
              <TabPanel value={value} index={0}>
                <Overview data={overviewData} callbackSetDataOption={handleOverviewChange} />
              </TabPanel>
            </LazyLoad>
            <LazyLoad once={true}>
              <TabPanel value={value} index={1}>
                <Posts />
              </TabPanel>
            </LazyLoad>
          </Box>
        </Grid>
        <Grid item lg={3} md={3} xl={3} xs={12}>
          <Box sx={{ pt: 2 }}>
            <UserInfo data={userData} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile

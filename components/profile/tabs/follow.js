import React, { useEffect, useState } from 'react'
import { Box, Container, Tab, Tabs } from '@mui/material'
import axiosClient from '../../../axiosClient'
import LazyLoad from 'react-lazyload'
import FollowTab from '../follow/follow-tab'
import TabPanel from '../follow/tab-pannel'

const Follow = () => {
  const [followData, setFollowData] = useState([])
  const [followerData, setFollowerData] = useState([])
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleDelete = (data, type) => {
    console.log(data)
    console.log(type)
    switch (type) {
      case 'Follow':
        setFollowData(followData.filter((record) => record.id !== data.id))
        break
      case 'Follower':
        setFollowerData(followerData.filter((record) => record.id !== data.id))
        break
    }
  }
  useEffect(() => {
    async function fetchData() {
      const id = 1
      try {
        const result = await axiosClient.get(`/account-users?id=${id}`)
        const data = result.data[0]
        const refinedFollowData = data.FollowUsers.map((record, index) => {
          return {
            id: index,
            displayName: record.DisplayName,
            followerNum: record.FollowerNum,
            gotoUrl: `${window.location.origin}/profile/${record.id}`,
          }
        })
        const refinedFollowerData = data.FollowedByUsers.map((record, index) => {
          return {
            id: index,
            displayName: record.DisplayName,
            followerNum: record.FollowerNum,
            gotoUrl: `${window.location.origin}/profile/${record.id}`,
          }
        })
        setFollowData(refinedFollowData)
        setFollowerData(refinedFollowerData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Follows" />
          <Tab label="Followers" />
        </Tabs>
      </Box>
      <Box pt={2}>
        <LazyLoad once={true}>
          <TabPanel value={value} index={0}>
            <FollowTab data={followData} callbackDelete={handleDelete} type="Follow" />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={1}>
            <FollowTab data={followerData} callbackDelete={handleDelete} type="Follower" />
          </TabPanel>
        </LazyLoad>
      </Box>
    </Container>
  )
}

export default Follow

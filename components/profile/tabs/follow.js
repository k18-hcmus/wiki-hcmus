import React, { useEffect, useState } from 'react'
import { Box, Container, Tab, Tabs } from '@mui/material'
import axiosClient from '../../../axiosClient'
import LazyLoad from 'react-lazyload'
import FollowTab from '../follow/follow-tab'
import TabPanel from '../commons/tab-pannel'
import { addHistory } from '../../../utils/history-utils'
import { HISTORY_CONST } from '../../../shared/constants'

const Follow = () => {
  const [followData, setFollowData] = useState([])
  const [followerData, setFollowerData] = useState([])
  const [rawFollowData, setRawFollowData] = useState([])
  const [rawFollowerData, setRawFollowerData] = useState([])
  const [value, setValue] = React.useState(0)
  const userId = 1
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleDelete = async (data, type) => {
    console.log(data)
    console.log(type)
    switch (type) {
      case 'Follow':
        const deletedFollow = rawFollowData[data.id]
        setFollowData(followData.filter((record) => record.id !== data.id))
        setRawFollowData(rawFollowData.splice(data.id, 1))
        const newFollowData = {
          FollowUsers: rawFollowData,
        }
        const followResult = await axiosClient({
          method: 'put',
          url: `/account-users/${userId}`,
          data: newFollowData,
          headers: {},
        })
        if (followResult) {
          addHistory(
            { const: HISTORY_CONST.ACTOR.SELF, id: userId },
            { const: HISTORY_CONST.ACTION.UNFOLLOW },
            { const: HISTORY_CONST.TARGET.USER, id: deletedFollow.id }
          )
        }
        break
      case 'Follower':
        const deletedFollower = rawFollowerData[data.id]
        setFollowerData(followerData.filter((record) => record.id !== data.id))
        setRawFollowerData(rawFollowerData.splice(data.id, 1))
        const newFollowerData = {
          FollowedByUsers: rawFollowerData,
        }
        const followerResult = await axiosClient({
          method: 'put',
          url: `/account-users/${userId}`,
          data: newFollowerData,
          headers: {},
        })
        if (followerResult) {
          addHistory(
            { const: HISTORY_CONST.ACTOR.SELF, id: userId },
            { const: HISTORY_CONST.ACTION.REMOVE },
            { const: HISTORY_CONST.TARGET.FOLLOWER, id: deletedFollower.id }
          )
        }
        break
    }
  }
  useEffect(() => {
    async function fetchData() {
      const id = 1
      try {
        const result = await axiosClient.get(`/account-users?id=${id}`)
        const data = result.data[0]
        setRawFollowData(data.FollowUsers)
        setRawFollowerData(data.FollowedByUsers)
        const refinedFollowData = data.FollowUsers.map((record, index) => {
          return {
            id: index,
            displayName: record.DisplayName,
            followerNum: record.FollowerNum,
            gotoUrl: `${window.location.origin}/profile/${record.id}`,
            avatarURL: record.Avatar
          }
        })
        const refinedFollowerData = data.FollowedByUsers.map((record, index) => {
          return {
            id: index,
            displayName: record.DisplayName,
            followerNum: record.FollowerNum,
            gotoUrl: `${window.location.origin}/profile/${record.id}`,
<<<<<<< HEAD
<<<<<<< HEAD
            avatarURL: record.Avatar
=======
>>>>>>> 8bf1257 (Complete Follow layout and interaction)
=======
            avatarURL: record.Avatar
>>>>>>> 0b0191c (Add avatar & re-design history, follow tab & mechanics)
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
          <Tab label="Follow" />
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

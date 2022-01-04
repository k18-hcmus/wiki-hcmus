import React, { useState, useEffect } from 'react'
import axiosClient from '../../../axiosClient'
import { HISTORY_CONST } from '../../../shared/constants'
import { addHistory } from '../../../utils/history-utils'
import { Card, Box, CardHeader, Avatar, CardContent, Typography, Grid, Button } from '@mui/material'

const UserInfo = ({ data, setData, ownUserData, callbackUpdateUserData }) => {
  const [imgErr, setImgErr] = useState(false)
  const [followed, setFollowed] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      setData({ ...data, AvatarURL: '/static/avatars/avatar_1.jpg' })
      setImgErr(true)
    }
  }
  const handleFollowClick = () => {
    setFollowed(true)
    handleFollowUser()
  }
  const handleFollowUser = async () => {
    try {
      const followArray = ownUserData.FollowUsers.filter((follow) => follow.id !== data.id)
      const followData = {
        FollowUsers: followArray,
      }
      const result = await axiosClient({
        method: 'put',
        url: `/account-users/${ownUserData.id}`,
        data: followData,
        headers: {},
      })
      if (result) {
        callbackUpdateUserData('FollowUsers', followArray)
        addHistory(
          { const: HISTORY_CONST.ACTOR.SELF, id: ownUserData.id },
          { const: HISTORY_CONST.ACTION.FOLLOW },
          { const: HISTORY_CONST.TARGET.USER, id: data.id }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleUnfollowClick = () => {
    setFollowed(false)
    handleUnfollowUser()
  }
  const handleUnfollowUser = async () => {
    try {
      const followArray = ownUserData.FollowUsers.filter((follow) => follow.id !== data.id)
      const followData = {
        FollowUsers: followArray,
      }
      const result = await axiosClient({
        method: 'put',
        url: `/account-users/${ownUserData.id}`,
        data: followData,
        headers: {},
      })
      if (result) {
        callbackUpdateUserData('FollowUsers', followArray)
        addHistory(
          { const: HISTORY_CONST.ACTOR.SELF, id: ownUserData.id },
          { const: HISTORY_CONST.ACTION.UNFOLLOW },
          { const: HISTORY_CONST.TARGET.USER, id: data.id }
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (data.id && ownUserData && ownUserData.FollowUsers) {
      if (ownUserData.FollowUsers.find((follow) => follow.id === data.id)) setFollowed(true)
    }
  }, [])

  return (
    <Card elevation={3}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardHeader
          avatar={
            <Avatar
              display="block"
              alt="user avatar"
              src={data.AvatarURL}
              onError={handleImgError}
              sx={{ width: 120, height: 120 }}
              align="center"
            />
          }
        />
      </Box>
      <CardContent>
        <Typography
          component="div"
          variant="body2"
          color="text.primary"
          display="block"
          textAlign="center"
        >
          {data.UserType}
        </Typography>
        <Typography
          component="div"
          variant="body2"
          color="text.primary"
          display="block"
          textAlign="center"
          sx={{ mb: 2 }}
        >
          {ownUserData.id === data.id ? '(You) ' + data.DisplayName : data.DisplayName}
        </Typography>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="caption" color="text.primary" display="block" textAlign="left">
              Contributions
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="left">
              {data.totalCP}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="caption" color="text.primary" display="block" textAlign="left">
              Followers
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="left">
              {data.followerNum}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="caption" color="text.primary" display="block" textAlign="left">
              Posts
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="left">
              {data.Posts.length}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="caption" color="text.primary" display="block" textAlign="left">
              Comments
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="left">
              {data.Comments.length}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="caption" color="text.primary" textAlign="left">
              Tier&nbsp;&nbsp;
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="left">
              {data.tier}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="caption" color="text.primary" display="block" textAlign="left">
              Email
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" textAlign="left">
              {data.email}
            </Typography>
          </Grid>
          {ownUserData.id !== data.id && followed && (
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button onClick={handleUnfollowClick} variant="contained">
                  Followed
                </Button>
              </Box>
            </Grid>
          )}
          {ownUserData.id !== data.id && !followed && (
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Button onClick={handleFollowClick} variant="outlined">
                  Follow
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserInfo

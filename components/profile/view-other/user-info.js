import React, { useEffect, useState } from 'react'
import { Card, Box, CardHeader, Avatar, CardContent, Typography, Grid } from '@mui/material'

const UserInfo = ({ data }) => {
  const [avatarURL, setAvatarURL] = useState(data.AvatarURL || '/static/avatars/avatar_1.jpg')
  const [imgErr, setImgErr] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  return (
    <Card>
      <Box display="flex" justifyContent="center" alignItems="center">
        <CardHeader
          avatar={
            <Avatar
              display="block"
              alt="user avatar"
              src={avatarURL}
              onError={handleImgError}
              sx={{ width: 120, height: 120 }}
              align="center"
            />
          }
        />
      </Box>
      <CardContent>
        <Typography component="div" variant="body2" color="text.primary" display="block" textAlign="center">
          {data.UserType}
        </Typography>
        <Typography component="div" variant="body2" color="text.primary" display="block" textAlign="center" sx={{mb: 2}}>
          {data.DisplayName}
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
        </Grid>
      </CardContent>
    </Card>
  )
}

export default UserInfo

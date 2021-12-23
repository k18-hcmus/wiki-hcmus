import React, { useState } from 'react'
import { Grid, Button, Avatar, Typography, styled, Link, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const MoreButton = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const CenteredGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const FollowCell = ({ type, data, callbackDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [avatarURL, setAvatarURL] = useState(data.avatarURL || '/static/avatars/avatar_1.jpg')
  const [imgErr, setImgErr] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDelete = () => {
    setAnchorEl(null)
    callbackDelete(data)
  }
  const handleImgError = () => {
    if (!imgErr) {
      setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  return (
    <Grid container>
      <CenteredGrid item lg={3} md={3} xl={3} xs={6}>
        <Link href={data.gotoUrl} underline="none">
          <Avatar
            sx={{
              height: 50,
              width: 50,
            }}
          >
            <img src={avatarURL} onerror={handleImgError}/>
          </Avatar>
        </Link>
      </CenteredGrid>
      <Grid item lg={7} md={7} xl={7} xs={7}>
        <Grid container>
          <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
            <Link href={data.gotoUrl} underline="hover">
              <Typography align="left" color="text.primary" variant="body2">
                {data.displayName}
              </Typography>
            </Link>
          </CenteredGrid>
          <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
            <Typography align="left" color="text.secondary" variant="caption">
              {data.followerNum} followers
            </Typography>
          </CenteredGrid>
        </Grid>
      </Grid>
      <CenteredGrid item lg={2} md={2} xl={2} xs={2}>
        <MoreButton>
          <MoreHorizIcon
            id="unfollow-button"
            aria-controls="follow-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id="follow-menu"
            aria-labelledby="unfollow-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
<<<<<<< HEAD
            {type === 'Follow' && <MenuItem onClick={handleDelete}>Unfollow</MenuItem>}
            {type === 'Follower' &&  <MenuItem onClick={handleDelete}>Remove</MenuItem>}
=======
            <MenuItem onClick={handleDelete}>Unfollow</MenuItem>
>>>>>>> 8bf1257 (Complete Follow layout and interaction)
          </Menu>
        </MoreButton>
      </CenteredGrid>
    </Grid>
  )
}

export default FollowCell

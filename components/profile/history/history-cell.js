import { formatDistanceToNow } from 'date-fns'
import React, { useState } from 'react'
import {
  Grid,
  Button,
  ListItem,
  Avatar,
  Typography,
  styled,
  Checkbox,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const MoreButton = styled(Button)({
  position: 'absolute',
  right: '15px',
})

const CenteredGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const HistoryCell = ({ id, data, setData, checkBoxStatus, onCheckCallBack, callbackGoto }) => {
  console.log(data)
  const [anchorEl, setAnchorEl] = useState(null)
  const [imgErr, setImgErr] = useState(false)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleCheck = (event) => {
    onCheckCallBack(id, event.target.checked)
  }
  const handleGoto = () => {
    setAnchorEl(null)
    callbackGoto(data)
  }
  const handleImgError = () => {
    if (!imgErr) {
      setData({...data, AvatarURL: '/static/avatars/avatar_1.jpg'})
      setImgErr(true)
    }
  }
  return (
    <ListItem sx={{ px: 4 }}>
      <Grid container spacing={1}>
        <Grid item lg={2} md={2} xl={2} xs={6}>
          <Grid container>
            <CenteredGrid item lg={6} md={6} xl={6} xs={6}>
              <Checkbox align="left" checked={checkBoxStatus || false} onChange={handleCheck} />
            </CenteredGrid>
            <CenteredGrid item lg={6} md={6} xl={6} xs={6}>
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                }}
              >
                <img src={data.AvatarURL} onError={handleImgError}/>
              </Avatar>
            </CenteredGrid>
          </Grid>
        </Grid>
        <CenteredGrid item lg={3} md={3} xl={3} xs={6}>
          <Typography sx={{ ml: 1 }} align="left" variant="body2">
            {data.actor}
          </Typography>
        </CenteredGrid>
        <CenteredGrid item lg={4} md={4} xl={4} xs={7}>
          <Typography align="left" variant="caption">
            {data.action}
          </Typography>
        </CenteredGrid>
        <CenteredGrid item lg={2} md={2} xl={2} xs={4}>
          <Typography align="right" color="textSecondary" variant="caption">
            {formatDistanceToNow(new Date(data.created_at))}
          </Typography>
        </CenteredGrid>
        <CenteredGrid item lg={1} md={1} xl={1} xs={1}>
          <MoreButton>
            <MoreVertIcon
              id="history-button"
              aria-controls="history-menu"
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
            <Menu
              id="history-menu"
              aria-labelledby="history-button"
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
              <MenuItem onClick={handleGoto}>Goto</MenuItem>
            </Menu>
          </MoreButton>
        </CenteredGrid>
      </Grid>
    </ListItem>
  )
}

export default HistoryCell

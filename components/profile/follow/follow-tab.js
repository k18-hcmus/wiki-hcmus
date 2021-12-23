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

const FollowTab = ({ data, gotoCallback, deleteCallback }) => {
  return (
    <Grid container spacing={3}>
      {data.map((record, index) => (
        <Grid container key={index} item lg={6} md={6} xl={6} xs={12}>
          <CenteredGrid item lg={2} md={2} xl={2} xs={6}>
            <Avatar
              sx={{
                height: 50,
                width: 50,
              }}
            >
              <img src="https://via.placeholder.com/100" />
            </Avatar>
          </CenteredGrid>
          <CenteredGrid item lg={2} md={2} xl={2} xs={6}>
            <Typography sx={{ ml: 1 }} align="left" variant="caption">
              {data.actor}
            </Typography>
          </CenteredGrid>
        </Grid>
      ))}
    </Grid>
  )
}

export default FollowTab

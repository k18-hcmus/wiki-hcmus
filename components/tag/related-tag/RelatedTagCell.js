import React, { useState, useEffect, useCallback } from 'react'
import axiosClient from '../../../axiosClient'
import { useRouter } from 'next/router'
import { ListItem, Link, Typography, Grid, Avatar, Divider } from '@mui/material'
import { TAG_DETAIL, COLOR_SET } from '../../../shared/constants'

const RelatedTagCell = ({ data, lastItem }) => {
  const [avatarURL, setAvatarURL] = useState(data.AvatarURL || '/static/avatars/avatar_1.jpg')
  const [imgErr, setImgErr] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  const gotoUrl = `/tags/${data.id}`
  return (
    <>
      <ListItem>
        <Link href={gotoUrl} underline="none">
          <Grid container spacing={1} display="flex" alignItems="center">
            <Grid item auto sx={{mr: 1}}>
              <Avatar
                display="inline"
                alt="Tag Avatar"
                onError={handleImgError}
                src={avatarURL}
                sx={{ width: 35, height: 35 }}
                style={{
                  border: `1px solid ${COLOR_SET.BLUE}`,
                }}
              />
            </Grid>
            <Grid item auto>
              <Typography variant="body2" color="text.primary" display="inline">
                {data.Name}
              </Typography>
            </Grid>
          </Grid>
        </Link>
      </ListItem>
      {!lastItem && <Divider />}
    </>
  )
}

export default RelatedTagCell

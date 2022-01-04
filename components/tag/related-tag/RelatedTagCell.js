import React, { useState, useEffect } from 'react'
import { ListItem, Link, Typography, Grid, Avatar, Divider } from '@mui/material'
import { COLOR_SET, CATEGORY_CONST } from '../../../shared/constants'

const RelatedTagCell = ({ data, lastItem }) => {
  const [avatarURL, setAvatarURL] = useState(null)
  const [imgErr, setImgErr] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      if (data.Category) {
        if (data.Category.Name === CATEGORY_CONST.TEACHER)
          setAvatarURL('/static/avatars/teacher.png')
        else if (data.Category.Name === CATEGORY_CONST.SUBJECT)
          setAvatarURL('/static/avatars/subject.png')
      } else setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  useEffect(() => {
    if (!data)
      return
    if (data.Category) {
      if (data.AvatarURL && data.AvatarURL !== '') setAvatarURL(data.AvatarURL)
      else if (data.Category.Name === CATEGORY_CONST.TEACHER)
        setAvatarURL('/static/avatars/teacher.png')
      else if (data.Category.Name === CATEGORY_CONST.SUBJECT)
        setAvatarURL('/static/avatars/subject.png')
    } else setAvatarURL('/static/avatars/avatar_1.jpg')
  }, [data])
  const gotoUrl = `/tags/${data.id}`
  return (
    <>
      <ListItem>
        <Link href={gotoUrl} underline="none">
          <Grid container spacing={1} display="flex" alignItems="center">
            <Grid item auto sx={{ mr: 1 }}>
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

import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import axiosClient from '../../../axiosClient.js'
import styled from '@emotion/styled'
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

import { useRouter } from 'next/router'

function DetailPost() {
  const [userDetail, setUserDetail] = useState([])
  const [postDetail, setPostDetail] = useState([])
  const [disable, setDisable] = useState(true)
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    async function FetchPost() {
      const response = await axiosClient.get(`/posts/${id}`)
      setPostDetail(response.data)

      setUserDetail(response.data.User)
    }
    FetchPost()
  }, [])
  const handleClickUpdate = async () => {
    const response = await axiosClient.put(`/posts/${id}`, {
      Status: 'PUBLISH',
    })
  }
  return (
    <Grid container spacing={2} sx={{ mt: 5, marginRight: 5 }}>
      <Grid item xs={8}>
        <Card sx={{ maxWidth: '90%', marginLeft: 10 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postDetail.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {postDetail.Content}
            </Typography>
          </CardContent>
          <CardActions>
            <Typography gutterBottom variant="h5" component="div">
              <ThumbUpIcon />
              {postDetail.UpvoteCount}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
              <ThumbDownIcon />
              {postDetail.DownvoteCount}
            </Typography>
          </CardActions>

          <CardActions>
            <Button size="small" onClick={handleClickUpdate}>
              PUBLIC
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="text.secondary">
                Name:
                {userDetail.DisplayName}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                phone:{userDetail.Phone}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Email:{userDetail.Email}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DetailPost

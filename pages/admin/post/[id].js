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
  TextField,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { STATUS_POST } from '../../../shared/constants.js'
import { useRouter } from 'next/router'
import { Modal } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}
function DetailPost() {
  const [userDetail, setUserDetail] = useState([])
  const [postDetail, setPostDetail] = useState([])
  const [disable, setDisable] = useState(true)
  const router = useRouter()
  const { id } = router.query
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
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
      Status: STATUS_POST.Publish.value,
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
            <Button size="small" onClick={handleClickUpdate} variant="outlined" sx={{ ml: 2 }}>
              {STATUS_POST.Publish.label}
            </Button>
            <Button size="small" onClick={handleClickUpdate} variant="outlined" sx={{ ml: 2 }}>
              {STATUS_POST.Report.label}
            </Button>
            <Button size="small" onClick={handleOpen} variant="outlined" sx={{ ml: 2 }}>
              {STATUS_POST.Refused.label}
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  reason for refusal
                </Typography>
                <TextField fullWidth sx={{ mt: 2 }} />
                {/* noi day handle refuse */}
                <Button onClick={handleClose} variant="outlined" sx={{ mt: 2 }}>
                  DONE
                </Button>
              </Box>
            </Modal>
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

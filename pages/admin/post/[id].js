import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import axiosClient from '../../../axiosClient.js'
import draftToHtml from 'draftjs-to-html'
import { NORTIFICATION_CONST } from '../../../shared/constants.js'
import { addNortification } from '../../../utils/nortification-utils.js'
import { useSelector } from 'react-redux'
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
import { STATUS_POST } from '../../../shared/constants.js'
import { useRouter } from 'next/router'
import { Modal } from '@mui/material'
import { getAccUser } from '../../../redux/slices/userSlice'

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
  const [changeContent, setChangeContent] = useState()
  const router = useRouter()
  const { id } = router.query
  const [open, setOpen] = useState(false)
  const [contentRefuse, setContentRefuse] = useState()
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
      const user = await axiosClient.get(`/account-users/${response.data.User}`)
      setUserDetail(user.data)
      const content = response.data.Content
      setChangeContent(draftToHtml(JSON.parse(content)))
    }
    FetchPost()
  }, [])
  const handleClickUpdate = async () => {
    const response = await axiosClient.put(`/posts/${id}`, {
      Status: STATUS_POST.Publish.value,
    })
  }
  const [ownUserData, setOwnUserData] = useState({
    id: null,
    DisplayName: '',
  })
  const userDataObject = useSelector(getAccUser)
  useEffect(() => {
    if (userDataObject && Object.keys(userDataObject).length !== 0) {
      setOwnUserData(userDataObject)
    }
  }, [userDataObject])

  const handleSubmit = async () => {
    try {
      const textContent = `Admin ${ownUserData.DisplayName}  refused your post ${postDetail.Title}`
      addNortification(NORTIFICATION_CONST.TYPE.ADMIN, postDetail.User, postDetail.id, textContent)

      const response = await axiosClient.put(`/posts/${id}`, {
        Status: STATUS_POST.Refused.value,
      })
    } catch (error) {
      console.log(error)
    }
    setOpen(false)
  }
  const handleChangeRefuseDescription = (e) => {
    setContentRefuse(e.target.value)
  }

  return (
    <Grid container spacing={2} sx={{ mt: 5, marginRight: 5 }}>
      <Grid item xs={8}>
        <Card sx={{ maxWidth: '90%', marginLeft: 10 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {postDetail.Title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              dangerouslySetInnerHTML={{ __html: changeContent }}
            ></Typography>
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
                <TextField
                  label="Description"
                  fullWidth
                  sx={{ mt: 2 }}
                  onChange={handleChangeRefuseDescription}
                />

                {/* noi day handle refuse */}
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={handleSubmit}
                >
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default DetailPost

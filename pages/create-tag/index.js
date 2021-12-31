import { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
//import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import axiosClient from '../../axiosClient'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/styles'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
const CreateTag = () => {
  const router = useRouter()
  const user = useSelector(getUser)
  const [disabled, setDisabled] = useState(false)
  const [msg, setMsg] = useState({ err: '', success: '' })
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)
    try {
      console.log('data', user)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  const showAvatarTag = () => {
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" fullWidth variant="text">
            Upload picture
          </Button>
        </CardActions>
      </Card>
    )
  }
  const showDetailTag = () => {
    return (
      <Card>
        <CardHeader subheader="The information can be edited" title="Tag Detail" />
        <Divider />
        <CardContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField required fullWidth id="NameTag" label="NameTag" name="NameTag" autoFocus />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth
                multiline
                rows={5}
                name="TagContent"
                label="Tag Description"
                id="TagContent"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => {
              router.push('/admin/UsersActive')
            }}
          >
            Back
          </Button>
          <LoadingButton color="secondary" loading={loading} variant="contained" type="submit">
            Create tag
          </LoadingButton>
        </Box>
      </Card>
    )
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      component="form"
      onSubmit={handleSubmit}
      noValidate
    >
      <Grid container spacing="10" direction="row" justifyContent="center" alignItems="flex-start">
        <Grid item xs={6} md={2}>
          {showAvatarTag()}
        </Grid>
        <Grid item xs={6} md={6}>
          {showDetailTag()}
        </Grid>
      </Grid>
    </Box>
  )
}
export default CreateTag

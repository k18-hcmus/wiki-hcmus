import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Container,
  Modal,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/styles'
import axiosClient from '../../../axiosClient'
import useRouter from 'next/router'
import Link from 'next/link'
import { showSuccessMsg, showErrMsg } from '../../../utils/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../../redux/slices/userSlice'
const SubmitButton = styled(LoadingButton)({
  width: '100%',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  marginBottom: '15px',
})
const BoxForm = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -70%)',
  width: 800,
  backgroundColor: '#FFFFFF',
  border: '1px solid #000',
  //borderRadius: theme.shape.borderRadius,
  boxShadow: 24,
}))
export default function Login({ open, handleClose }) {
  const [disabled, setDisabled] = useState(false)
  const [msg, setMsg] = useState({ err: '', success: '' })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    setMsg({ err: '', success: '' })
    setDisabled(false)
    setLoading(false)
  }, [open])
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (localStorage.getItem('token')) {
      return
    }
    setDisabled(true)
    setLoading(true)
    const data = new FormData(event.currentTarget)
    try {
      const response = await axiosClient.post('/auth/local', {
        identifier: data.get('username'),
        password: data.get('password'),
      })
      if (response.data) {
        setMsg({ err: '', success: 'Login success' })
        localStorage.setItem('token', response.data.jwt)

        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
          'token'
        )}`
        const accountUser = await axiosClient.get(
          `/account-users/${response.data.user.DetailUser.id}`
        )
        console.log('res', accountUser)
        dispatch(userLogin({ user: response.data.user, accUser: accountUser.data }))
      }
    } catch (err) {
      setMsg({ err: err.response.data.message[0].messages[0].message, success: '' })
    }
    setLoading(false)
  }

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' && !loading) {
          handleClose()
        }
      }}
    >
      <BoxForm
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {msg.success && showSuccessMsg(msg.success)}
        {msg.err && showErrMsg(msg.err)}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <SubmitButton
            loading={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Sign In
          </SubmitButton>
        </Box>
      </BoxForm>
    </Modal>
  )
}

import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Modal,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material'
import { styled } from '@mui/styles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axiosClient from '../../../axiosClient'
import useRouter from 'next/router'
import { showSuccessMsg, showErrMsg } from '../../../utils/Notifications'
import { isEmail } from '../../../utils/validation'
import { ROLE_AUTH_ID } from '../../../shared/constants'
import LoadingButton from '@mui/lab/LoadingButton'
const RegisterButton = styled(LoadingButton)({
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
  width: 1200,
  backgroundColor: '#FFFFFF',
  border: '1px solid #000',
  borderRadius: theme.shape.borderRadius,
  boxShadow: 24,
}))
export default function Register({ open, handleClose }) {
  const [disabled, setDisabled] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [displayNameError, setDisplayNameErrorr] = useState(false)
  const [msg, setMsg] = useState({ err: '', success: '' })
  const [gender, setGender] = useState('Male')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setMsg({ err: '', success: '' })
    setDisplayNameErrorr(false)
    setEmailError(false)
    setUsernameError(false)
    setPasswordError(false)
    setDisabled(false)
  }, [open])
  const handleChangeGender = (event) => {
    setGender(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)
    setLoading(true)
    setEmailError(false)
    setUsernameError(false)
    setPasswordError(false)
    const data = new FormData(event.currentTarget)
    //check email valid
    if (!isEmail(data.get('email'))) {
      setMsg({ err: 'Invalid email', success: '' })
    }
    //check email,username,password empty
    if (data.get('email') === '') {
      setEmailError(true)
    }
    if (data.get('username') === '') {
      setUsernameError(true)
    }
    if (data.get('password') === '') {
      setPasswordError(true)
    }
    if (data.get('DisplayName') === '') {
      setDisplayNameErrorr(true)
    }
    if (
      data.get('email') &&
      data.get('username') &&
      data.get('password') &&
      data.get('DisplayName')
    ) {
      try {
        const response = await axiosClient.post('/auth/local/register', {
          email: data.get('email'),
          username: data.get('username'),
          password: data.get('password'),
        })
        console.log('res', response)
        const UserId = response.data.user.id
        if (response.data) {
          const res = await axiosClient.post('/account-users', {
            DisplayName: data.get('DisplayName'),
            Gender: gender,
            Phone: data.get('Phone'),
            FirstName: data.get('firstName'),
            LastName: data.get('lastName'),
            User: UserId,
          })
          setMsg({ err: '', success: 'Register success please check your email to activate' })
        }
        if (!response.data) {
          setMsg({ err: 'Register faill', success: '' })
        }
      } catch (err) {
        console.log('err', err.response.data)
        setMsg({ err: err.response.data.message, success: '' })
      }
    }
    setLoading(false)
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <BoxForm
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register New Account
        </Typography>
        {msg.success && showSuccessMsg(msg.success)}
        {msg.err && showErrMsg(msg.err)}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="Phone"
                label="Phone Number"
                name="Phone"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  value={gender}
                  onChange={handleChangeGender}
                >
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="DisplayName"
                label="Display Name"
                name="DisplayName"
                autoComplete="DisplayName"
                error={displayNameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                error={usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={passwordError}
              />
            </Grid>
          </Grid>
          <RegisterButton
            loading={loading}
            loadingPosition="start"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Register
          </RegisterButton>
        </Box>
      </BoxForm>
    </Modal>
  )
}

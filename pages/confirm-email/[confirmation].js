import React, { useState, useEffect } from 'react'
import { Avatar, Button, Box, Typography, Container } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import axiosClient from '../../axiosClient'
import { showSuccessMsg, showErrMsg } from '../../utils/Notifications'
import { useRouter } from 'next/router'
export default function ActivationEmail() {
  const router = useRouter()
  const { confirmation } = router.query
  const [msg, setMsg] = useState({ err: '', success: '' })
  useEffect(() => {
    if (confirmation) {
      const activationEmail = async () => {
        try {
          const res = await axiosClient.get(
            `/auth/email-confirmation/?confirmation=${confirmation}`
          )
          if (res.data) {
            setMsg({ err: '', success: 'Confirm email success' })
          }
        } catch (err) {
          console.log('res', err.response)
          setMsg({ err: 'Email invalid or already confirm', success: '' })
        }
      }
      activationEmail()
    }
  }, [confirmation])
  const handleGoBackLogin = (e) => {
    e.preventDefault()
    router.push('/')
  }
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Verify New Account
        </Typography>
        {msg.success && showSuccessMsg(msg.success)}
        {msg.err && showErrMsg(msg.err)}
        <Button onClick={handleGoBackLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Go back home
        </Button>
      </Box>
    </Container>
  )
}

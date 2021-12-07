import React from 'react'
import Alert from '@mui/material/Alert'
export const showErrMsg = (msg) => {
  return <Alert severity="error">{msg}</Alert>
}

export const showSuccessMsg = (msg) => {
  return <Alert severity="success">{msg}</Alert>
}

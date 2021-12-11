import React from 'react'
import {
  TextField,
} from '@mui/material'

const EditTextInput = (props) => {
  const { setCallbackValue, defaultValue } = props
  const handleChange = (event) => {
    setCallbackValue(event.target.value)
  }
  return (
    <TextField
      autoFocus
      margin="dense"
      id="edit-information-text-input"
      type="text"
      defaultValue={defaultValue}
      fullWidth
      variant="standard"
      onChange={handleChange}
    />
  )
}

export default EditTextInput;
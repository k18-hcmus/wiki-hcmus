import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  styled,
  TextField,
  Collapse,
  Alert,
  IconButton,
} from '@mui/material'
import { REPORT_CONST } from '../../shared/constants'
import CloseIcon from '@mui/icons-material/Close'
import { addDelete } from '../../utils/report-utils'

const DeleteDialog = ({ open, type, data, userId, callbackClose, deletePost }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [description, setDescription] = useState('')
  let displayText = ''
  const maxDisplayChar = REPORT_CONST.LABEL.MAX_DISPLAY_CHAR
  switch (type) {
    case REPORT_CONST.TYPE.POST:
      displayText =
        data.Title.length > maxDisplayChar
          ? `'${data.Title.substring(0, maxDisplayChar)}...'`
          : `'${data.Title}'`
      break
    case REPORT_CONST.TYPE.COMMENT:
      displayText =
        data.Content.length > maxDisplayChar
          ? `'${data.Content.substring(0, maxDisplayChar)}...'`
          : `'${data.Content}'`
      break
  }
  const handleChangeText = (event) => {
    setDescription(event.target.value)
  }
  const handleComfirm = () => {
    if (description === '') {
      setOpenAlert(true)
      window.setTimeout(() => setOpenAlert(false), 2000)
      return
    }
    //Todo: better set a new field (e.g. isDeleted) instead of delete record
    addDelete(type, data.User.id, data.id, description)
    callbackClose()
    //Todo: add delete comment
    deletePost(data.id)
  }
  return (
    <Dialog open={open} onClose={callbackClose}>
      <DialogTitle>{`Delete ${type} ${displayText}`}</DialogTitle>
      <DialogContent>
        <Collapse in={openAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            You must enter description for deleting
          </Alert>
        </Collapse>
        <DialogContentText>{REPORT_CONST.LABEL.CONTEXT}</DialogContentText>
        <TextField
          label={REPORT_CONST.LABEL.DESCRIPTION}
          multiline
          rows={3}
          maxRows={6}
          sx={{ width: '100%' }}
          variant="outlined"
          value={description}
          onChange={handleChangeText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={callbackClose}>{REPORT_CONST.LABEL.CANCEL}</Button>
        <Button onClick={handleComfirm}>{REPORT_CONST.LABEL.CONFIRM}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog

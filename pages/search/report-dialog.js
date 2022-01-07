import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
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
import { addReport } from '../../utils/report-utils'

const RoundButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}))

const ReportDialog = ({ open, type, data, userId, callbackClose }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [description, setDescription] = useState('')
  const [reasons, setReasons] = useState(Object.keys(REPORT_CONST.REASON).map(() => false))
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
    case REPORT_CONST.TYPE.USER:
      displayText =
        data.DisplayName.length > maxDisplayChar
          ? `'${data.DisplayName.substring(0, maxDisplayChar)}...'`
          : `'${data.DisplayName}'`
      break
  }
  const handleChange = (event) => {
    let newReasons = reasons
    newReasons[event.target.id] = !newReasons[event.target.id]
    setReasons([...newReasons])
  }
  const handleChangeText = (event) => {
    setDescription(event.target.value)
  }
  const handleComfirm = () => {
    if (reasons.every((reason) => reason === false)) {
      setOpenAlert(true)
      window.setTimeout(() => setOpenAlert(false), 2000)
      return
    }
    let reasonString = ''
    reasons.forEach((reason, index) => {
      if (reason) reasonString += Object.keys(REPORT_CONST.REASON)[index] + ' '
    })
    reasonString = reasonString.slice(0, reasonString.length - 1)
    addReport(type, userId, data.id, reasonString, description)
    callbackClose()
  }
  return (
    <Dialog open={open} onClose={callbackClose}>
      <DialogTitle>{`${REPORT_CONST.LABEL.REPORT} ${type} ${displayText}`}</DialogTitle>
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
            {REPORT_CONST.LABEL.EMPTY_REASON}
          </Alert>
        </Collapse>
        <DialogContentText>{REPORT_CONST.LABEL.CONTEXT}</DialogContentText>
        <Box sx={{ py: 2 }}>
          {Object.keys(REPORT_CONST.REASON).map((reason, index) => (
            <RoundButton
              sx={{ m: 1 }}
              id={index}
              key={index}
              onClick={handleChange}
              variant={reasons[index] ? 'contained' : 'outlined'}
            >
              {REPORT_CONST.REASON[reason]}
            </RoundButton>
          ))}
        </Box>
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

export default ReportDialog

import React, { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled
} from '@mui/material'
import { Icon } from '@iconify/react'

const ConfigButton = styled(Button)({
  position: 'absolute',
  right: '15px',
})

const EditDialog = (props) => {
  const { BaseEditComponent, callbackValueSet, label } = props
  const [openDialog, setOpenDialog] = useState(false)
  const [editValue, setEditValue] = useState(null)
  const handleOpen = () => {
    setOpenDialog(true)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }
  const handleConfirm = () => {
    setOpenDialog(false)
    callbackValueSet(editValue)
  }
  const handleValueChange = (value) => {
    setEditValue(value)
  }
  const EditComponent = React.cloneElement(BaseEditComponent, {
    setCallbackValue: handleValueChange,
  })
  return (
    <div>
      <ConfigButton variant="outlined" onClick={handleOpen}>
        <Icon icon="mdi:grease-pencil" />
      </ConfigButton>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Edit {label}</DialogTitle>
        <DialogContent>{EditComponent}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default EditDialog;
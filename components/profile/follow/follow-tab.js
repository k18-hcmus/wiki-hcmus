import React, { useState } from 'react'
import { Grid, Dialog, DialogTitle, DialogActions, Button } from '@mui/material'
import FollowCell from './follow-cell'
const FollowTab = ({ data, callbackDelete, type }) => {
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteData, setDeleteData] = useState(0)
  const handleConfirm = () => {
    callbackDelete(deleteData, type)
    setOpenDialog(false)
  }
  const handleCancel = () => {
    setOpenDialog(false)
  }
  const handleClose = () => {
    setOpenDialog(false)
  }
  const handleDelete = (data) => {
    setDeleteData(data)
    setOpenDialog(true)
  }
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Unfollow ${deleteData.displayName}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        {data.map((record, index) => (
          <Grid item key={index} item lg={6} md={6} xl={6} xs={12}>
            <FollowCell data={record} callbackDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default FollowTab

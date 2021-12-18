import React from 'react'
import {
  Grid,
  Paper,
  Skeleton,
  styled
} from '@mui/material'
import EditDialog from '../information/edit-dialog';

const Label = styled('div')(({ theme }) => ({
  ...theme.typography.h6,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.primary,
}))

const Value = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}))

const Config = styled('div')(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  position: 'relative',
  color: theme.palette.text.primary,
}))

const ProfileCell = (props) => {
  const { label, value, setValue, disabled, BaseEditComponent, uid, property } = props
  const handleValueSet = (value) => {
    setValue(property, value)
  }
  return (
    <Paper elevation={3} sx={{ mb: 5, px: 3, pb: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Label>{label}</Label>
          {value ? <Value>{value}</Value> : <Skeleton animation="wave" />}
        </Grid>
        {disabled ? (
          <Grid> </Grid>
        ) : (
          <Grid item xs={6} md={4}>
            <Config>
              <EditDialog
                label={label}
                BaseEditComponent={BaseEditComponent}
                callbackValueSet={handleValueSet}
              />
            </Config>
          </Grid>
        )}
      </Grid>
    </Paper>
  )
}

export default ProfileCell;
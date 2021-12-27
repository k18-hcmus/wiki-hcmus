import { useState, useEffect } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material'
//import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import axiosClient from '../../../../axiosClient'
import { STATES_CONST } from '../../../../shared/constants'

export const AccountProfileDetails = (props) => {
  const router = useRouter()
  const [user, setUser] = useState({})
  //const { enqueueSnackbar } = useSnackbar()
  const { id } = router.query

  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`)
      setUser(response.data)
    }
    FetchUser()
  }, [])
  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant })
  }

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axiosClient.put(`/account-users/${id}`, {
        DisplayName: user.DisplayName,
        Status: user.Status,
        Email: user.Email,
        Phone: user.Phone,
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form autoComplete="off" noValidate {...props} onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Username"
                disabled
                onChange={handleChange}
                required
                value={user.Username}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="DisplayName"
                name="DisplayName"
                onChange={handleChange}
                required
                value={user.DisplayName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Email"
                name="Email"
                onChange={handleChange}
                required
                value={user.Email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Phone number"
                name="Phone"
                onChange={handleChange}
                type="number"
                value={user.Phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Select Status"
                name="Status"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={user.Status}
                variant="outlined"
              >
                {STATES_CONST.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 3 }}
            onClick={() => {
              router.push('/admin/UsersActive')
            }}
          >
            Back
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            // onClick={() => handleClickVariant}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}

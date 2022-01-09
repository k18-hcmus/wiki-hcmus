import * as React from 'react'
import Typography from '@mui/material/Typography'
import { Box, Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import AccountProfile from './components/AccountProfile'
import AccountProfileDetails from './components/AccountProfileDetails'
const DetailUser = () => {
  const [user, setUser] = useState({})
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    async function FetchUserById() {
      try {
        const response = await axios.get(`/account-users/${id}`)
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    FetchUserById()
  }, [])
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography sx={{ mb: 3 }} variant="h4">
          Account
        </Typography>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <AccountProfile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <AccountProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default DetailUser

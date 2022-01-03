import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import axiosClient from '../../../../axiosClient'
import _ from 'lodash'
export const AccountProfile = (props) => {
  const [user, setUser] = useState([])
  const [posts, setPosts] = useState()
  const router = useRouter()
  const { id } = router.query
  const [contribution, setContribution] = useState()
  const [disable, setDisable] = useState(true)
  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`)
      setUser(response.data)
      setPosts(response.data.Posts)
      let c = _.get(response.data.Contributions[0], 'Value')
      setContribution(c)
      //get contribution to use decentralization user
      if (contribution >= 150 && user.Posts.length) {
        setDisable(false)
      }
    }
    FetchUser()
  }, [])

  const handleDecentralizationUser = () => {
    console.log('contri:', contribution, 'length:', user.Posts.length)
    if (contribution >= 150 && user.Posts.length) {
      setDisable(true)
    }
  }
  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={user.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user.DisplayName}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${user.Email} `}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.Phone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {/* <Button color="primary" fullWidth variant="text" variant="outlined">
          Upload picture
        </Button> */}
        <Button
          color="primary"
          fullWidth
          variant="text"
          variant="outlined"
          disabled={disable}
          onClick={handleDecentralizationUser}
        >
          Decentralization
        </Button>
      </CardActions>
    </Card>
  )
}

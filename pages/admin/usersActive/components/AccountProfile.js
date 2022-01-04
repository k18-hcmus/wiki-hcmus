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
import { ROLE_STATUS } from '../../../../shared/moderator-constants'
import { CONTRIBUTION_CONST } from '../../../../shared/constants'
export const AccountProfile = (props) => {
  const [user, setUser] = useState([])
  const [posts, setPosts] = useState()
  const router = useRouter()
  const { id } = router.query
  const [contribution, setContribution] = useState()
  const [disable, setDisable] = useState(false)
  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`)
      setUser(response.data)
      setPosts(response.data.Posts)
      console.log('user', response.data)
      let c = _.get(response.data.Contributions[0], 'Value')
      setContribution(c)
      //get contribution to use decentralization user
    }
    FetchUser()
  }, [])

  const handleClick = async () => {
    try {
      const userId = user.User.id
      const response = await axiosClient.put(`/users/${userId}`, {
        role: ROLE_STATUS.MODERATOR.value,
      })
      setDisable(true)
    } catch (error) {
      console.log(error)
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
            src={user.AvatarURL}
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
            {user.Email}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user.Phone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        {contribution >= CONTRIBUTION_CONST.TIER.Silver && user.Posts.length ? (
          <Button
            color="primary"
            fullWidth
            variant="text"
            variant="outlined"
            onClick={handleClick}
            disabled={disable}
          >
            Decentralization
          </Button>
        ) : (
          <Typography></Typography>
        )}
      </CardActions>
    </Card>
  )
}

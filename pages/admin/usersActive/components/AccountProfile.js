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
import { getTotalContribution, getUserTier } from '../../../../utils/contribution-utils'

const AccountProfile = (props) => {
  const [user, setUser] = useState([])
  const [posts, setPosts] = useState()
  const router = useRouter()
  const { id } = router.query
  const [contribution, setContribution] = useState()
  const [disable, setDisable] = useState(false)
  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`)
      let userDetail = response.data
      userDetail.contribution = await getTotalContribution('object', userDetail)
      userDetail.tier = getUserTier(userDetail.contribution)[0]
      setUser(response.data)
      setPosts(response.data.Posts)
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
      const userTypeRespone = await axiosClient.put(`/account-users/${user.id}`, {
        UserType: ROLE_STATUS.MODERATOR.label,
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
        {user.contribution >= CONTRIBUTION_CONST.TIER.Silver ? (
          <Button
            color="primary"
            fullWidth
            variant="outlined"
            onClick={handleClick}
            disabled={disable}
          >
            promote
          </Button>
        ) : (
          <Typography></Typography>
        )}
      </CardActions>
    </Card>
  )
}

export default AccountProfile

import { Avatar, Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

const PostCard = styled(Box)({
  width: '900px',
  height: '100px',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '10px',
  marginBottom: '10px',
  borderRadius: '10px',
  marginBottom: '2px',
})

const AvartaBox = styled(Box)({
  width: '20%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const AvatarPerson = styled(Avatar)({
  width: '60px',
  height: '60px',
})

const MainContent = styled(Box)({
  width: '80%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  pading: '10px',
})

const NameMember = styled(Box)({
  width: '70%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})

const NameUser = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  marginLeft: '10px',
  marginRight: '10px',
})

const MemberFollow = styled(Typography)({
  fontSize: '18px',
  color: '#bbc0c6',
  marginLeft: '20px',
})

const JoinButton = styled(Button)({
  borderRadius: '20px',
  width: '60px',
  height: '40px',
  color: '#1a6ec2',
  fontWeight: 'bold',
  marginRight: '10px',
})

const UserSearch = ({ user = {} }) => {
  const router = useRouter()
  const handleJoinClick = () => {
    router.push(`/progile/${user.id}`)
  }
  return (
    <PostCard sx={{ boxShadow: 3 }}>
      <AvartaBox>
        <Link href={`/profile/${user.id}`} passHref>
          <a>
            <AvatarPerson src="/static/avatars/avatar_1.jpg" />
          </a>
        </Link>
      </AvartaBox>
      <MainContent>
        <NameMember>
          <Link href={`profile/${user.id}`} passHref>
            <a>
              <NameUser>{user.DisplayName}</NameUser>
            </a>
          </Link>
          <MemberFollow>{user.FollowerNum} followers</MemberFollow>
        </NameMember>
        <JoinButton variant="outlined" onClick={handleJoinClick}>
          Join
        </JoinButton>
      </MainContent>
    </PostCard>
  )
}

export default UserSearch

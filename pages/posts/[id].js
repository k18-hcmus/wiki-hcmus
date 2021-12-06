import { Typography, Container, Avatar, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import styled from '@emotion/styled'
import { posts } from '../../mock/data'

const UserSection = styled.div`
  display: flex;
`

const Username = styled.div`
  color: #0984e3;
  margin-right: 24px;
`

const FollowButton = styled(Button)`
  display: inline-block;
  height: fit-content;
  white-space: normal;
  text-align: left;
  padding: 0 8px;

  & > * {
    vertical-align: middle;
  }
`

const Post = ({ post }) => {
  const user = post.User

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 10 }}>
        <Typography variant="h3" component="div" sx={{ mb: 5 }}>
          {post.Title}
        </Typography>

        {/* Avatar section */}
        <UserSection>
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            sx={{ width: 56, height: 56, mr: 5, mb: 5 }}
          />
          <Username>{user.username}</Username>
          <FollowButton variant="contained">
            {' '}
            <AddIcon /> Theo dõi
          </FollowButton>
        </UserSection>

        {/* This is to render HTML content generate by React Quill and save to database */}
        <div dangerouslySetInnerHTML={{ __html: post.Content }}></div>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  // TODO: Change to fetch data from server when integrate, right now we just get post from mock data
  const { params } = context
  const post = posts.find((p) => p.id == params.id)

  return {
    props: {
      post
    } // will be passed to the page component as props
  }
}

export default Post

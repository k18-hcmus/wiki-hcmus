import {
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  TextField,
  Box
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { posts } from '../../mock/data'
import TagCard from './components/TagCard'
import Comment from './components/Comment'
import Vote from './components/Vote'

const PostStatisticSection = styled('div')`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`

const UserSection = styled('div')`
  align-items: center;
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(5)};
`

const Username = styled('h4')`
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

const ContentSection = styled(Grid)`
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.spacing(2)};
`

const TagSection = styled(Grid)`
  padding: 0 ${({ theme }) => theme.spacing(2)};
`

const InputCommentField = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`

const Post = ({ post }) => {
  const user = post.User
  const tags = post.Tags
  const comments = post.Comments

  const { DownvoteCount, UpvoteCount } = post
  const vote = UpvoteCount - DownvoteCount

  return (
    <>
      <Container maxWidth="lg">
        <Grid container sx={{ mt: 10, display: 'flex', flexDirection: 'row' }}>
          <ContentSection item md={9}>
            <Typography variant="h3" component="div" sx={{ mb: 1 }}>
              {post.Title}
            </Typography>

            {/* Post Statistics: vote, comments */}
            <PostStatisticSection>
              <Vote upvote={UpvoteCount} downvote={DownvoteCount} />
              <Box sx={{ ml: 3 }}>
                <p>Bình luận: {comments.length}</p>
              </Box>
            </PostStatisticSection>

            {/* User info section */}
            <UserSection>
              <Avatar
                alt="Remy Sharp"
                src={user.avatar}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Username>{user.username}</Username>
              <FollowButton variant="contained">
                <AddIcon />
                <span>Theo dõi</span>
              </FollowButton>
            </UserSection>

            {/* This div is to render HTML content generate by React Draft get from database */}
            <div
              dangerouslySetInnerHTML={{ __html: post.Content }}
              sx={{ overflow: 'hidden' }}
            ></div>

            {/* Post Statistics: vote, comments */}
            <PostStatisticSection>
              <Vote upvote={UpvoteCount} downvote={DownvoteCount} />
              <Box sx={{ ml: 3 }}>
                <p>Bình luận: {comments.length}</p>
              </Box>
            </PostStatisticSection>

            <Divider variant="fullWidth" sx={{ mb: 5 }} />

            {/* Comments sections */}

            <Typography variant="h4">Bình luận</Typography>

            <InputCommentField>
              <TextField
                placeholder="Bình luận mới"
                multiline
                fullWidth
                minRows={2}
                variant="standard"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" style={{ marginLeft: 'auto' }}>
                Đăng
              </Button>
            </InputCommentField>

            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </ContentSection>

          {/* Tag Section */}
          <TagSection item md={3}>
            <TagCard tag={tags[0]} />
          </TagSection>
        </Grid>
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

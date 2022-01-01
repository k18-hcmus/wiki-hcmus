import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  TextField,
  Box,
  Skeleton,
} from '@mui/material'
import {
  Add as AddIcon,
  Message as MessageIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import LazyLoad from 'react-lazyload'
import { animateScroll as scroll } from 'react-scroll'
import isEmpty from 'lodash/isEmpty'

import TagCard from './components/TagCard'
import Comment from './components/Comment'
import Vote from './components/Vote'
import axiosClient from '../../axiosClient'
import draftToHtml from 'draftjs-to-html'
import { getUser } from '../../redux/slices/userSlice'
import { getPostById, getCommentsByPostId } from '../../utils/post-utils'
import { addNewComment } from '../../utils/comment-utils'

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

const InputCommentField = styled('form')`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`

const IconStatistic = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacing(2)};
`

const BackToTopButton = styled(Button)({
  width: '200px',
  height: '40px',
  borderRadius: '15px',
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  zIndex: 10,
})

const Post = ({ post }) => {
  const {
    Title,
    Content,
    ViewCount,
    User: user,
    Tags: tags,
    Comments: CommentsProps,
    PostVotes,
  } = post

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loadingComment, setLoadingComment] = useState(true)
  const [visible, setVisible] = useState(false)
  const [votes, setVotes] = useState(PostVotes)

  const userState = useSelector(getUser)

  let upvotes = votes.filter((v) => v.Upvote)
  let downvotes = votes.filter((v) => v.Downvote)

  let userVote

  if (!isEmpty(userState)) {
    userVote = votes.find((v) => v.User == userState.DetailUser)
  }

  const htmlContent = Content ? draftToHtml(JSON.parse(Content)) : ''

  const handleChangeNewComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    const response = await addNewComment({
      User: userState.DetailUser,
      Post: post.id,
      Content: newComment,
    })
    setNewComment('')
    setComments((prevState) => {
      const comment = response.data
      return [comment, ...prevState]
    })
  }

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const handleDownVote = async () => {
    if (userVote) {
      const response = await axiosClient.put(`/post-votes/${userVote.id}`, {
        Downvote: !userVote.Downvote,
        Upvote: false,
      })

      setVotes((prevState) => {
        const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
        prevState[updatedObjIndex] = response.data
        return [...prevState]
      })
    } else {
      const response = await axiosClient.post('/post-votes', {
        Downvote: true,
        Upvote: false,
        Post: post.id,
        User: userState.DetailUser,
      })

      setVotes((prevState) => [response.data, ...prevState])
    }
  }

  const handleUpVote = async () => {
    if (userVote) {
      const response = await axiosClient.put(`/post-votes/${userVote.id}`, {
        Downvote: false,
        Upvote: !userVote.Upvote,
      })

      setVotes((prevState) => {
        const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
        prevState[updatedObjIndex] = response.data
        return [...prevState]
      })
    } else {
      const response = await axiosClient.post('/post-votes', {
        Downvote: false,
        Upvote: true,
        Post: post.id,
        User: userState.DetailUser,
      })

      setVotes((prevState) => [response.data, ...prevState])
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getCommentsByPostId(post.id)

      if (response.data) {
        setComments(response.data)
        setLoadingComment(false)
      }
    }

    fetchComments()
  }, [])

  // Increase view count of the post
  useEffect(() => {
    const increaseViewCount = async () => {
      await axiosClient.put(`/posts/${post.id}`, {
        ViewCount: ViewCount + 1,
      })
    }

    increaseViewCount()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 600) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    })
  }, [])

  return (
    <>
      <Container maxWidth="lg">
        <Grid container sx={{ mt: 10, display: 'flex', flexDirection: 'row' }}>
          <ContentSection item md={9}>
            <Typography variant="h3" component="div" sx={{ mb: 1 }}>
              {Title}
            </Typography>

            {/* Post Statistics: vote, comments */}
            <PostStatisticSection>
              <Vote
                upvoteCount={upvotes.length}
                downvoteCount={downvotes.length}
                userVote={userVote}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
              />
              <Box sx={{ ml: 3, display: 'flex', spacing: 2 }}>
                <IconStatistic>
                  <VisibilityIcon sx={{ marginRight: 1 }} /> {ViewCount}
                </IconStatistic>
                <IconStatistic>
                  <MessageIcon sx={{ marginRight: 1 }} /> {CommentsProps.length}
                </IconStatistic>
              </Box>
            </PostStatisticSection>

            {/* User info section */}
            <UserSection>
              <Avatar alt="user avatar" src={user.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
              <Username>{user.DisplayName}</Username>
              <FollowButton variant="contained">
                <AddIcon />
                <span>Theo dõi</span>
              </FollowButton>
            </UserSection>

            {/* This div is to render HTML content generate by React Draft get from database */}
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              sx={{ overflow: 'hidden' }}
            ></div>

            {/* Post Statistics: vote, comments */}
            <PostStatisticSection>
              <Vote
                upvoteCount={upvotes.length}
                downvoteCount={downvotes.length}
                userVote={userVote}
                handleDownVote={handleDownVote}
                handleUpVote={handleUpVote}
              />
              <Box sx={{ ml: 3, display: 'flex', spacing: 2 }}>
                <IconStatistic>
                  <VisibilityIcon sx={{ marginRight: 1 }} /> {ViewCount}
                </IconStatistic>
                <IconStatistic>
                  <MessageIcon sx={{ marginRight: 1 }} /> {CommentsProps.length}
                </IconStatistic>
              </Box>
            </PostStatisticSection>

            <Divider variant="fullWidth" sx={{ mb: 5 }} />

            {/* Comments sections */}
            <Typography variant="h4">Bình luận</Typography>

            <InputCommentField onSubmit={handleSubmitComment}>
              <TextField
                placeholder="Bình luận mới"
                multiline
                fullWidth
                value={newComment}
                onChange={handleChangeNewComment}
                minRows={2}
                variant="standard"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" style={{ marginLeft: 'auto' }}>
                Đăng
              </Button>
            </InputCommentField>

            {loadingComment ? (
              <Skeleton
                sx={{ height: 100, borderRadius: 1 }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              comments.map((comment) => (
                <LazyLoad key={comment.id} height={150} once={true}>
                  <Comment key={comment.id} comment={comment} />
                </LazyLoad>
              ))
            )}
          </ContentSection>
          {/* Tag Section */}
          <TagSection item md={3}>
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
          </TagSection>

          {visible && (
            <BackToTopButton color="primary" variant="contained" onClick={scrollToTop}>
              Back To Top
            </BackToTopButton>
          )}
        </Grid>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  const {
    params: { id: postId },
  } = context

  try {
    const response = await getPostById(postId)
    const post = response.data
    if (!post) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      }
    }
    return {
      props: {
        post,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
}

export default Post

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
  Visibility as VisibilityIcon,
  Flag as FlagIcon,
  ChatBubbleOutline as ChatBubbleOutlineIcon,
} from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import LazyLoad from 'react-lazyload'
import { animateScroll as scroll } from 'react-scroll'
import { useSnackbar } from 'notistack'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import trim from 'lodash/trim'

import TagCard from '../../components/post/TagCard'
import Comment from '../../components/post/Comment'
import Vote from '../../components/post/Vote'
import ReportDialog from '../../components/commons/report-dialog'
import axiosClient from '../../axiosClient'
import draftToHtml from 'draftjs-to-html'
import { getUser } from '../../redux/slices/userSlice'
import { toggleLoginForm } from '../../redux/slices/authSlice'
import { getPostById, getCommentsByPostId } from '../../utils/post-utils'
import { addNewComment } from '../../utils/comment-utils'
import { fDate } from '../../utils/formatTime'
import { REPORT_CONST } from '../../shared/report-constants'

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
  color: ${({ theme }) => theme.palette.grey[600]};
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
  const [isOpenReport, setIsOpenReport] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const userState = useSelector(getUser)
  const dispatch = useDispatch()

  const htmlContent = Content ? draftToHtml(JSON.parse(Content)) : ''

  let upvotes = votes.filter((v) => v.Upvote)
  let downvotes = votes.filter((v) => v.Downvote)
  let userVote
  if (!isEmpty(userState)) {
    userVote = votes.find((v) => {
      return (
        v.User == get(userState, 'DetailUser', '') || v.User == get(userState, 'DetailUser.id', '')
      )
    })
  }

  const handleChangeNewComment = (e) => {
    setNewComment(e.target.value)
  }

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    if (!newComment || trim(newComment).length === 0) {
      enqueueSnackbar('Can not post empty comment.', {
        variant: 'error',
      })
    } else {
      try {
        const response = await addNewComment({
          User: userState.DetailUser,
          Post: post.id,
          Content: trim(newComment),
        })
        setNewComment('')
        setComments((prevState) => {
          const comment = response.data
          return [comment, ...prevState]
        })
        enqueueSnackbar('Post comment successful.', {
          variant: 'success',
        })
      } catch (error) {
        enqueueSnackbar('Error while posting comment.', {
          variant: 'error',
        })
      }
    }
  }

  const scrollToTop = () => {
    scroll.scrollToTop()
  }

  const handleDownVote = async () => {
    try {
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
    } catch (error) {
      enqueueSnackbar('Error while down vote.', {
        variant: 'error',
      })
    }
  }

  const handleUpVote = async () => {
    try {
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
    } catch (error) {
      enqueueSnackbar('Error while up vote.', {
        variant: 'error',
      })
    }
  }

  const handleClickNewComment = () => {
    if (isEmpty(userState)) {
      dispatch(toggleLoginForm())
    }
  }

  const handleReportOpen = () => {
    setIsOpenReport(true)
  }

  const handleReportClose = () => {
    setIsOpenReport(false)
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
              <Box sx={{ ml: 3, display: 'flex', spacing: 2, alignItems: 'center' }}>
                <Typography> {fDate(post.created_at)}</Typography>
                <IconStatistic>
                  <VisibilityIcon sx={{ marginRight: 1 }} /> {ViewCount}
                </IconStatistic>
                <IconStatistic>
                  <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} /> {CommentsProps.length}
                </IconStatistic>
                <Button
                  component="span"
                  sx={{ color: (theme) => theme.palette.grey[600] }}
                  onClick={handleReportOpen}
                >
                  <FlagIcon /> Report
                </Button>
                <ReportDialog
                  open={isOpenReport}
                  type={REPORT_CONST.TYPE.POST}
                  data={post}
                  callbackClose={handleReportClose}
                  userId={16}
                />
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
              <Box sx={{ ml: 3, display: 'flex', spacing: 2, alignItems: 'center' }}>
                <Typography> {fDate(post.created_at)}</Typography>
                <IconStatistic>
                  <VisibilityIcon sx={{ marginRight: 1 }} /> {ViewCount}
                </IconStatistic>
                <IconStatistic>
                  <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} /> {CommentsProps.length}
                </IconStatistic>
                <Button
                  component="span"
                  sx={{ color: (theme) => theme.palette.grey[600] }}
                  onClick={handleReportOpen}
                >
                  <FlagIcon /> Report
                </Button>
              </Box>
            </PostStatisticSection>

            <Divider variant="fullWidth" sx={{ mb: 5 }} />

            {/* Comments sections */}
            <Typography variant="h4">Bình luận</Typography>

            <InputCommentField onSubmit={handleSubmitComment}>
              <TextField
                placeholder="Enter new comment"
                multiline
                fullWidth
                value={newComment}
                onChange={handleChangeNewComment}
                onClick={handleClickNewComment}
                minRows={2}
                variant="standard"
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" style={{ marginLeft: 'auto' }}>
                Comment
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

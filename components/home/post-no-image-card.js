import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  Typography,
  styled,
  IconButton,
} from '@mui/material'
import draftToHtml from 'draftjs-to-html'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import axiosClient from '../../axiosClient'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import VoteVertical from './vote-vertical'
import Link from 'next/link'
import PostActionButtons from '../commons/post-action-buttons'
import { formatDistanceToNow } from 'date-fns'
import { DELETE_CONST } from '../../shared/constants'
import DeleteDialog from '../commons/delete-dialog'

const SeeMoreButton = styled(Button)({
  borderRadius: '15px',
  zIndex: 10,
})

const PostNoImageCard = ({ post, isAdmin, deletePost }) => {
  const [widthPost, setWidthPost] = useState()
  const draftContent = JSON.parse(post.Content)
  const htmlContent = draftToHtml(draftContent)
  const router = useRouter()
  const [votes, setVotes] = useState(post.PostVotes)
  const userState = useSelector(getUser)
  const ref = useRef(null)
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
  useEffect(() => {
    setWidthPost(ref.current.offsetHeight)
  })
  const handleClickTag = (event) => {
    router.push(`/tags/${event.currentTarget.id}`)
  }
  const handlePostDetail = () => {
    router.push(`/posts/${post.id}`)
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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleDeletePost = () => {
    setOpenDeleteDialog(true)
  }
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false)
  }
  return (
    <Card ref={ref} sx={{ mb: 3 }}>
      <Grid container>
        <Grid item lg={1} md={1} xl={1} xs={2} sx={{ p: 1, mt: 3 }}>
          <VoteVertical
            upvoteCount={upvotes.length}
            downvoteCount={downvotes.length}
            userVote={userVote}
            handleDownVote={handleDownVote}
            handleUpVote={handleUpVote}
          />
        </Grid>
        <Grid item lg={11} md={11} xl={11} xs={10} sx={{ pt: 1, pr: 1 }}>
          <Grid container spacing={1} sx={{ p: 1 }}>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Grid container sx={{ pr: 1 }}>
                <Grid item lg={1} md={1} xl={1} xs={1}>
                  <Link href={`/profile/${post.User.id}`} passHref>
                    <a>
                      <Avatar
                        sx={{ width: '50px', height: '50px' }}
                        src={
                          !post.User.AvatarURL || post.User.AvatarURL === ''
                            ? '/static/avatars/avatar_1.jpg'
                            : post.User.AvatarURL
                        }
                      />
                    </a>
                  </Link>
                </Grid>
                <Grid
                  item
                  lg={11}
                  md={11}
                  xl={11}
                  xs={11}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Link href={`/profile/${post.User.id}`} passHref>
                    <a>
                      <Typography color="text.primary" variant="body1" sx={{ ml: 1 }}>
                        {post.User.DisplayName}
                      </Typography>
                    </a>
                  </Link>
                  <Grid container>
                    {isAdmin && (
                      <Grid
                        item
                        lg={12}
                        md={12}
                        xl={12}
                        xs={12}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <IconButton onClick={handleDeletePost}>
                          <DeleteForeverIcon />
                        </IconButton>
                        <DeleteDialog
                          open={openDeleteDialog}
                          type={DELETE_CONST.TYPE.POST}
                          data={post}
                          callbackClose={handleDeleteClose}
                          userId={16}
                          deletePost={deletePost}
                        />
                      </Grid>
                    )}
                    <Grid
                      item
                      lg={12}
                      md={12}
                      xl={12}
                      xs={12}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Typography color="text.secondary" variant="caption">
                        {formatDistanceToNow(new Date(post.published_at))} ago
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Typography color="text.primary" variant="h6">
                {post.Title}
                <Box style={{ marginTop: '-5px' }} display="flex" flexDirection="row">
                  <Grid container direction="row" spacing={1}>
                    {post.Tags &&
                      post.Tags.map((tag, index) => (
                        <Grid item key={index}>
                          <Chip
                            size="small"
                            id={tag.id}
                            label={tag.Name}
                            icon={<Avatar sx={{ width: 25, height: 25 }} src={tag.AvatarURL} />}
                            sx={{ color: '#FFFFFF', backgroundColor: tag.ColorTag }}
                            onClick={handleClickTag}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Grid container>
                <Grid item lg={12} md={12} xl={12} xs={12} display="flex" justifyContent="center">
                  <Link href={`/posts/${post.id}`} passHref>
                    <a>
                      <Typography
                        style={{ maxHeight: '400px', overflowY: 'hidden' }}
                        variant="body2"
                        color="primary"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                      ></Typography>
                    </a>
                  </Link>
                </Grid>
                <Grid item lg={12} md={12} xl={12} xs={12} display="flex" justifyContent="center">
                  {widthPost >= 400 && (
                    <SeeMoreButton color="primary" variant="contained" onClick={handlePostDetail}>
                      See more
                    </SeeMoreButton>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <PostActionButtons post={post} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default PostNoImageCard

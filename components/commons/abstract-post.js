import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Box, IconButton, Typography, Grid, Link, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import PostActionButtons from './post-action-buttons'
import axiosClient from '../../axiosClient'
import isEmpty from 'lodash/isEmpty'
import { getUser } from '../../redux/slices/userSlice'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { DELETE_CONST } from '../../shared/constants'
import DeleteDialog from './delete-dialog'

const CenteredGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const AbstractPost = ({ data, ownUserId, isAdmin, deletePost }) => {
  const [votes, setVotes] = useState([false, false])
  const [postVoteId, setPostVoteId] = useState(undefined)
  const [upvoteNum, setUpvoteNum] = useState(0)
  const [downvoteNum, setDownvoteNum] = useState(0)
  const userState = useSelector(getUser)
  const handleVote = async (event, index) => {
    if (isEmpty(userState)) return
    const newVotes = votes
    newVotes[index] = !newVotes[index]
    if (index === 0 && newVotes[1] === true) newVotes[1] = false
    else if (index === 1 && newVotes[0] === true) newVotes[0] = false
    if (newVotes[0]) setUpvoteNum(upvoteNum + 1)
    if (newVotes[1]) setDownvoteNum(downvoteNum + 1)
    setVotes([...newVotes])
    const voteData = {
      Upvote: newVotes[0],
      Downvote: newVotes[1],
      Post: data.id,
      User: ownUserId,
    }
    //Problem: We can't handle contribution for vote, because user can redo vote or change
    if (postVoteId) {
      axiosClient({
        method: 'put',
        url: `/post-votes/${postVoteId}`,
        data: voteData,
        headers: {},
      })
    } else {
      const postVoteResult = await axiosClient.post('/post-votes', voteData)
      setPostVoteId(postVoteResult.data.id)
    }
  }

  useEffect(() => {
    if (data.PostVotes && ownUserId) {
      let loadedVote = [false, false]
      if (data.PostVotes.filter((postVote) => postVote.User === ownUserId).length !== 0) {
        if (data.PostVotes.filter((postVote) => postVote.User === ownUserId)[0].Upvote === true)
          loadedVote[0] = true
        if (data.PostVotes.filter((postVote) => postVote.User === ownUserId)[0].Downvote === true)
          loadedVote[1] = true
        setPostVoteId(data.PostVotes.filter((postVote) => postVote.User === ownUserId)[0].id)
      }
      setVotes([...loadedVote])
      setUpvoteNum(data.PostVotes.filter((postVote) => postVote.Upvote === true).length)
      setDownvoteNum(data.PostVotes.filter((postVote) => postVote.Downvote === true).length)
    }
  }, [data, ownUserId])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const handleDeletePost = () => {
    setOpenDeleteDialog(true)
  }
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false)
  }
  return (
    <Paper elevation={3} sx={{ mb: 3 }} style={{ width: '100%' }}>
      <Grid container spacing={1}>
        <CenteredGrid item lg={1} md={1} xl={1} xs={2}>
          <CenteredGrid container>
            <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
              {votes[0] ? (
                <IconButton onClick={(e) => handleVote(e, 0)} color="primary">
                  <ArrowCircleUpIcon />
                </IconButton>
              ) : (
                <IconButton id={0} onClick={(e) => handleVote(e, 0)}>
                  <ArrowCircleUpIcon />
                </IconButton>
              )}
            </CenteredGrid>
            <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
              <Typography variant="caption" color="text.secondary">
                {upvoteNum - downvoteNum}
              </Typography>
            </CenteredGrid>
            <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
              {votes[1] ? (
                <IconButton onClick={(e) => handleVote(e, 1)} color="primary">
                  <ArrowCircleDownIcon />
                </IconButton>
              ) : (
                <IconButton id={1} onClick={(e) => handleVote(e, 1)}>
                  <ArrowCircleDownIcon />
                </IconButton>
              )}
            </CenteredGrid>
          </CenteredGrid>
        </CenteredGrid>
        <Grid item lg={11} md={11} xl={11} xs={10}>
          <Box display="flex" flexDirection="column" sx={{ p: 1 }}>
            <Box display="flex" flexDirection="row" sx={{ ml: 1 }} justifyContent="space-between">
              <Link href={`/posts/${data.id}`} underline="hover">
                <Typography variant="body1" color="text.primary">
                  {data.Title}
                </Typography>
              </Link>
              {isAdmin ? (
                <>
                  <IconButton onClick={handleDeletePost}>
                    <DeleteForeverIcon />
                  </IconButton>
                  <DeleteDialog
                    open={openDeleteDialog}
                    type={DELETE_CONST.TYPE.POST}
                    data={data}
                    callbackClose={handleDeleteClose}
                    userId={16}
                    deletePost={deletePost}
                  />
                </>
              ) : (
                <div></div>
              )}
            </Box>
            <Box display="flex" flexDirection="row" sx={{ ml: 1 }}>
              {data.Tags.map((tag, index) =>
                index !== data.Tags.length - 1 ? (
                  <Link key={index} href={`/tags/${tag.id}`} underline="hover">
                    <Typography variant="body2" color="text.secondary">
                      #{tag.Name},&nbsp;
                    </Typography>
                  </Link>
                ) : (
                  <Link key={index} href={`/tags/${tag.id}`} underline="hover">
                    <Typography variant="body2" color="text.secondary">
                      #{tag.Name}
                    </Typography>
                  </Link>
                )
              )}
            </Box>
            <Box display="flex" alignItems="center" sx={{ my: 1, ml: 1 }}>
              {/* This created_at should change to publish date */}
              {/* <TagName>{format(new Date(data.created_at), 'MMM dd, yyyy')}</TagName> */}
              <Typography variant="caption" color="text.secondary">
                Post by
              </Typography>
              <Link href={`/profile/${data.User.id}`} underline="hover">
                <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>
                  {data.User.DisplayName}
                </Typography>
              </Link>
              <Typography variant="caption" color="text.secondary">
                {format(new Date(data.created_at), 'HH:mm:ss MMM dd, yyyy')}
              </Typography>
            </Box>
            <PostActionButtons post={data} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AbstractPost

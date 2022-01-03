import React, { useEffect, useState } from 'react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { Box, IconButton, Typography, Grid, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import PostActionButtons from './post-action-buttons'
import axiosClient from '../../axiosClient'

const CenteredGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const AbstractPost = ({ data, ownUserId }) => {
  const [votes, setVotes] = useState([false, false])
  const [postVoteId, setPostVoteId] = useState(undefined)
  const [upvoteNum, setUpvoteNum] = useState(0)
  const [downvoteNum, setDownvoteNum] = useState(0)
  const handleVote = async (event, index) => {
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
  return (
    <Grid container spacing={1}>
      <CenteredGrid item lg={1} md={1} xl={1} xs={4}>
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
      <CenteredGrid item lg={2} md={2} xl={2} xs={8}>
        <img
          width="100px"
          heigt="100px"
          src={
            'https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/26/ngo-ngang-voi-ve-dep-cua-hot-girl-anh-the-chua-tron-18-docx-1622043349706.jpeg'
          }
        />
      </CenteredGrid>
      <Grid item lg={9} md={9} xl={9} xs={12}>
        <Box display="flex" flexDirection="column" sx={{ p: 1 }}>
          <Box display="flex" flexDirection="row" sx={{ ml: 1 }}>
            <Link href={`/posts/${data.id}`} underline="hover">
              <Typography variant="body1" color="text.primary">
                {data.Title}
              </Typography>
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" sx={{ ml: 1 }}>
            {data.Tags.map((tag, index) =>
              index !== data.Tags.length - 1 ? (
                <Link href={`/tags/${tag.id}`} underline="hover">
                  <Typography variant="body2" color="text.secondary">
                    #{tag.Name},&nbsp;
                  </Typography>
                </Link>
              ) : (
                <Link href={`/tags/${tag.id}`} underline="hover">
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
  )
}

export default AbstractPost

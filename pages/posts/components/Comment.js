import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Grid, Avatar, Paper } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import axiosClient from '../../../axiosClient'
import { getUser } from '../../../redux/slices/userSlice'
import Vote from './Vote'

const CommentPaper = styled(Paper)`
  padding: 20px 20px;
  margin: 20px 0;
`

const Comment = ({ comment }) => {
  const { Content: content, User: user, createdAt, CommentVotes } = comment
  console.log(comment)

  const [votes, setVotes] = useState(CommentVotes)

  const userState = useSelector(getUser)

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

  const handleDownVote = async () => {
    if (userVote) {
      const response = await axiosClient.put(`/comment-votes/${userVote.id}`, {
        Downvote: !userVote.Downvote,
        Upvote: false,
      })

      setVotes((prevState) => {
        const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
        prevState[updatedObjIndex] = response.data
        return [...prevState]
      })
    } else {
      const response = await axiosClient.post('/comment-votes', {
        Downvote: true,
        Upvote: false,
        Comment: comment.id,
        User: userState.DetailUser,
      })

      setVotes((prevState) => [response.data, ...prevState])
    }
  }

  const handleUpVote = async () => {
    if (userVote) {
      const response = await axiosClient.put(`/comment-votes/${userVote.id}`, {
        Downvote: false,
        Upvote: !userVote.Upvote,
      })

      setVotes((prevState) => {
        const updatedObjIndex = prevState.findIndex((v) => v.id == response.data.id)
        prevState[updatedObjIndex] = response.data
        return [...prevState]
      })
    } else {
      const response = await axiosClient.post('/comment-votes', {
        Downvote: false,
        Upvote: true,
        Comment: comment.id,
        User: userState.DetailUser,
      })

      setVotes((prevState) => [response.data, ...prevState])
    }
  }

  return (
    <CommentPaper>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar alt="Remy Sharp" src={user.AvatarURL} />
          <Vote
            upvoteCount={upvotes.length}
            downvoteCount={downvotes.length}
            userVote={userVote}
            handleUpVote={handleUpVote}
            handleDownVote={handleDownVote}
          />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>{user.DisplayName}</h4>
          <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>{createdAt}</p>
          <p style={{ textAlign: 'left' }}>{content}</p>
        </Grid>
      </Grid>
    </CommentPaper>
  )
}

export default Comment

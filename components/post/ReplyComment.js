import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Grid, Avatar, Paper } from '@mui/material'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import axiosClient from '../../axiosClient'
import { getUser } from '../../redux/slices/userSlice'
import Vote from './Vote'

const CommentPaper = styled(Paper)`
  padding: 20px 20px;
  margin: 20px 0;
`

const ReplyComment = (props) => {
  const id = props.comment.id

  const [comment, setComment] = useState({})

  const [votes, setVotes] = useState([])
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosClient.get(`/comments/${id}`)
      setComment(response.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!comment || !comment.CommentVotes) {
      setVotes([])
    } else {
      setVotes(comment.CommentVotes)
    }
  }, [comment])

  return (
    <Box sx={{ ml: 10 }}>
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
            <Avatar
              alt="Remy Sharp"
              src={
                comment.User && comment.User.AvatarURL && comment.User.AvatarURL !== ''
                  ? comment.User.AvatarURL
                  : '/static/avatars/avatar_1.jpg'
              }
            />
            <Vote
              upvoteCount={upvotes.length}
              downvoteCount={downvotes.length}
              userVote={userVote}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
            />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Box>
              <h4 style={{ margin: 0, textAlign: 'left' }}>
                {comment.User && comment.User.DisplayName}
              </h4>
              <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>{comment.createdAt}</p>
              <p style={{ textAlign: 'left' }}>{comment.Content}</p>
            </Box>
          </Grid>
        </Grid>
      </CommentPaper>
    </Box>
  )
}

export default ReplyComment

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/material/styles'
import { Box, Grid, Avatar, Paper, Button, TextField } from '@mui/material'
import { ChatBubbleOutline as ChatBubbleOutlineIcon } from '@mui/icons-material'

import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import axiosClient from '../../axiosClient'
import { getUser } from '../../redux/slices/userSlice'
import Vote from './Vote'
import ReplyComment from './ReplyComment'

const CommentPaper = styled(Paper)`
  padding: 20px 20px;
  margin: 20px 0;
`

const InputCommentField = styled('form')`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
`

const Comment = ({ comment }) => {
  const { Content: content, User: user, createdAt, CommentVotes, ReplyComments } = comment

  const [votes, setVotes] = useState(CommentVotes)
  const [replyComments, setReplyComments] = useState(ReplyComments)
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false)
  const [replyCommentContent, setReplyCommentContent] = useState('')
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

  const handleOpenReply = () => {
    setIsOpenReplyComment(true)
  }

  const handleCloseReply = () => {
    setIsOpenReplyComment(false)
  }

  const handleChangeReplyComment = (e) => {
    setReplyCommentContent(e.target.value)
  }

  const handleSubmitReplyComment = async (e) => {
    e.preventDefault()
    const response = await axiosClient.post('/comments', {
      Content: replyCommentContent,
      User: userState.DetailUser,
      CommentRepliedTo: comment.id,
    })

    setReplyComments((prevState) => [response.data, ...prevState])
    setReplyCommentContent('')
    setIsOpenReplyComment(false)
  }

  return (
    <Box>
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
            <Box>
              <h4 style={{ margin: 0, textAlign: 'left' }}>{user.DisplayName}</h4>
              <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>{createdAt}</p>
              <p style={{ textAlign: 'left' }}>{content}</p>
            </Box>
            <Box>
              <Button onClick={handleOpenReply} sx={{ color: (theme) => theme.palette.grey[600] }}>
                <ChatBubbleOutlineIcon sx={{ marginRight: 1 }} />
                Reply
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CommentPaper>

      {isOpenReplyComment && (
        <InputCommentField onSubmit={handleSubmitReplyComment}>
          <TextField
            placeholder="Reply comment"
            multiline
            fullWidth
            value={replyCommentContent}
            onChange={handleChangeReplyComment}
            onClick={() => {}}
            minRows={2}
            variant="standard"
            sx={{ mb: 2 }}
            autoFocus
          />
          <Box style={{ marginLeft: 'auto' }}>
            <Button variant="contained" onClick={handleCloseReply}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ ml: 2 }}>
              Reply
            </Button>
          </Box>
        </InputCommentField>
      )}

      {replyComments
        .sort((a, b) => a.created_at > b.created_at)
        .map((rComment) => (
          <ReplyComment key={rComment.id} comment={rComment} />
        ))}
    </Box>
  )
}

export default Comment

import React from 'react'
import { styled } from '@mui/material/styles'
import { Grid, Avatar, Paper } from '@mui/material'
import Vote from './Vote'

const CommentPaper = styled(Paper)`
  padding: 20px 20px;
  margin: 20px 0;
`

const Comment = ({ comment }) => {
  const { Content: content, User: user, createdAt } = comment
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
          <Avatar alt="Remy Sharp" src={user.avatar} />
          <Vote upvote={1} downvote={2} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <h4 style={{ margin: 0, textAlign: 'left' }}>{user.username}</h4>
          <p style={{ margin: 0, textAlign: 'left', color: 'gray' }}>{createdAt}</p>
          <p style={{ textAlign: 'left' }}>{content}</p>
        </Grid>
      </Grid>
    </CommentPaper>
  )
}

export default Comment

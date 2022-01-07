import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton, Typography, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import isEmpty from 'lodash/isEmpty'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import { getUser } from '../../redux/slices/userSlice'
import { toggleLoginForm } from '../../redux/slices/authSlice'

const UpdownText = styled(Typography)({
  fontSize: '14px',
  align: 'center',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
})
const UpDownVoteButton = styled(IconButton)({
  width: '25px',
  height: '25px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '3px',
})
const VoteVertical = ({ upvoteCount, downvoteCount, userVote, handleDownVote, handleUpVote }) => {
  const userState = useSelector(getUser)
  const dispatch = useDispatch()

  const vote = upvoteCount - downvoteCount

  let isUpVote = false,
    isDownVote = false

  if (userVote) {
    if (userVote.Upvote) {
      isUpVote = true
    } else if (userVote.Downvote) {
      isDownVote = true
    }
  }

  const handleClickDownVote = () => {
    if (isEmpty(userState)) {
      dispatch(toggleLoginForm())
    } else {
      handleDownVote()
    }
  }

  const handleClickUpVote = () => {
    if (isEmpty(userState)) {
      dispatch(toggleLoginForm())
    } else {
      handleUpVote()
    }
  }

  return (
    <Grid container>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {' '}
        <IconButton
          color={isUpVote ? 'error' : 'default'}
          onClick={() => handleClickUpVote()}
        >
          <ArrowCircleUpIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography>{vote}</Typography>
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {' '}
        <IconButton
          color={isDownVote ? 'error' : 'default'}
          onClick={() => handleClickDownVote()}
        >
          <ArrowCircleDownIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default VoteVertical

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'
import isEmpty from 'lodash/isEmpty'

import { getUser } from '../../../redux/slices/userSlice'
import { toggleLoginForm } from '../../../redux/slices/authSlice'

const StyledVote = styled('div')`
  align-items: center;
  display: flex;
`

const CustomIconButton = styled(IconButton)`
  padding: 5px;
`

const Vote = ({ upvoteCount, downvoteCount, userVote, handleDownVote, handleUpVote }) => {
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
    <StyledVote>
      <CustomIconButton
        color={isDownVote ? 'error' : 'default'}
        onClick={() => handleClickDownVote()}
      >
        <ArrowDownward />
      </CustomIconButton>
      {vote}
      <CustomIconButton
        color={isUpVote ? 'success' : 'default'}
        onClick={() => handleClickUpVote()}
      >
        <ArrowUpward />
      </CustomIconButton>
    </StyledVote>
  )
}

export default Vote

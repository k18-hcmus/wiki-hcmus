import React from 'react'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'
import axiosClient from '../../../axiosClient'

const StyledVote = styled('div')`
  align-items: center;
  display: flex;
`

const CustomIconButton = styled(IconButton)`
  padding: 5px;
`

const Vote = ({ upvoteCount, downvoteCount, userVote, handleDownVote, handleUpVote }) => {
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

  return (
    <StyledVote>
      <CustomIconButton color={isDownVote ? 'error' : 'default'} onClick={handleDownVote}>
        <ArrowDownward />
      </CustomIconButton>
      {vote}
      <CustomIconButton color={isUpVote ? 'success' : 'default'} onClick={handleUpVote}>
        <ArrowUpward />
      </CustomIconButton>
    </StyledVote>
  )
}

export default Vote

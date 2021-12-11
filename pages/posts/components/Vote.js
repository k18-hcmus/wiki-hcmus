import React from 'react'
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'

const StyledVote = styled('div')`
  align-items: center;
  display: flex;
`

const CustomIconButton = styled(IconButton)`
  padding: 5px;
`

const Vote = ({ upvote, downvote }) => {
  const vote = upvote - downvote

  return (
    <StyledVote>
      <CustomIconButton disableRipple>
        <ArrowDownward />
      </CustomIconButton>
      {vote}
      <CustomIconButton disableRipple>
        <ArrowUpward />
      </CustomIconButton>
    </StyledVote>
  )
}

export default Vote

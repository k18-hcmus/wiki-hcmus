import React, { useEffect, useState } from 'react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FlagIcon from '@mui/icons-material/Flag'
import ShareIcon from '@mui/icons-material/Share'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, Button, Card, IconButton, Typography, Grid, Link } from '@mui/material'
import { styled } from '@mui/material/styles'
import { format } from 'date-fns'
import PostActionButtons from './post-action-buttons'

const ArtButton = styled(Button)({
  width: '30px',
  height: '30px',
  borderRadius: '15px',
  backgroundColor: '#d98444',
  color: '#fff',
  marginLeft: '30px',
})

const ActionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

const CenteredGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const AbstractPost = ({ data }) => {
  return (
    <Grid container spacing={1}>
      <CenteredGrid item lg={1} md={1} xl={1} xs={4}>
        <CenteredGrid container>
          <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
            <IconButton>
              <ArrowCircleUpIcon />
            </IconButton>
          </CenteredGrid>
          <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="caption" color="text.secondary">
              {data.UpvoteCount - data.DownvoteCount}
            </Typography>
          </CenteredGrid>
          <CenteredGrid item lg={12} md={12} xl={12} xs={12}>
            <IconButton>
              <ArrowCircleDownIcon />
            </IconButton>
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
            {data.Tags.map((tag, index) => (
              <ArtButton key={index}>{tag.Name}</ArtButton>
            ))}
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
          <PostActionButtons post={data}/>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AbstractPost

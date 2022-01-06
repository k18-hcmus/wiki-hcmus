import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import FlagIcon from '@mui/icons-material/Flag'
import ShareIcon from '@mui/icons-material/Share'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { Box, Alert, IconButton, Typography, Collapse, MenuItem, Menu } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { FEATURE_MESSAGE, REPORT_CONST } from '../../shared/constants'
import CloseIcon from '@mui/icons-material/Close'
import ReportDialog from './report-dialog'
import isEmpty from 'lodash/isEmpty'
import { toggleLoginForm } from '../../redux/slices/authSlice'
import { getUser } from '../../redux/slices/userSlice'

const ActionBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
})

const PostActionButtons = ({ post }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userState = useSelector(getUser)
  const [openAlert, setOpenAlert] = useState(false)
  const handleClickComment = () => {
    router.push(`/posts/${post.id}`)
  }
  const handleClickShare = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickHide = () => {
    window.setTimeout(() => setOpenAlert(false), 2000)
    setOpenAlert(true)
  }
  const handleClickSave = () => {
    window.setTimeout(() => setOpenAlert(false), 2000)
    setOpenAlert(true)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openShareMenu = Boolean(anchorEl)
  const handleCloseShareMenu = () => {
    setAnchorEl(null)
  }
  const handleClickShareCopyLink = () => {
    const link = `${window.location.origin}/posts/${post.id}`
    window.prompt('Copy to clipboard: Ctrl+C, Enter', link)
    setAnchorEl(null)
  }
  const handleClickShareEmbed = () => {
    setAnchorEl(null)
  }
  const [openReportDialog, setOpenReportDialog] = useState(false)
  const handleClickReport = () => {
    if (!isEmpty(userState)) {
      setOpenReportDialog(true)
    }
    else {
      dispatch(toggleLoginForm())
    }
  }
  const handleReportClose = () => {
    setOpenReportDialog(false)
  }
  const handleReportConfirm = (reasons, description) => {
    setOpenReportDialog(false)
  }
  return (
    <>
      <Box>
        <Collapse in={openAlert}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {FEATURE_MESSAGE.NOT_SUPPORT}
          </Alert>
        </Collapse>
      </Box>
      <Box display="flex" flexDirection="row">
        <IconButton onClick={handleClickComment}>
          <ActionBox>
            <ChatBubbleOutlineIcon />
            <Typography variant="body2" color="text.secondary">
              Comment
            </Typography>
          </ActionBox>
        </IconButton>
        <IconButton
          onClick={handleClickShare}
          id="share-button"
          aria-controls="share-menu"
          aria-haspopup="true"
          aria-expanded={openShareMenu ? 'true' : undefined}
        >
          <ActionBox>
            <ShareIcon />
            <Typography variant="body2" color="text.secondary">
              Share
            </Typography>
          </ActionBox>
        </IconButton>
        <Menu
          id="share-menu"
          aria-labelledby="share-button"
          anchorEl={anchorEl}
          open={openShareMenu}
          onClose={handleCloseShareMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClickShareCopyLink}>Copy Link</MenuItem>
          <MenuItem onClick={handleClickShareEmbed}>Embed</MenuItem>
        </Menu>
        <IconButton onClick={handleClickReport}>
          <ActionBox>
            <FlagIcon />
            <Typography variant="body2" color="text.secondary">
              Report
            </Typography>
          </ActionBox>
        </IconButton>
        <ReportDialog
          open={openReportDialog}
          type={REPORT_CONST.TYPE.POST}
          data={post}
          callbackClose={handleReportClose}
          userId={16}
        />
        <IconButton onClick={handleClickSave}>
          <ActionBox>
            <BookmarkBorderIcon />
            <Typography variant="body2" color="text.secondary">
              Save
            </Typography>
          </ActionBox>
        </IconButton>
        <IconButton onClick={handleClickHide}>
          <ActionBox>
            <VisibilityOffIcon />
            <Typography variant="body2" color="text.secondary">
              Hide
            </Typography>
          </ActionBox>
        </IconButton>
      </Box>
    </>
  )
}

export default PostActionButtons

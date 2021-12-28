import React, { useState, useEffect, useCallback } from 'react'
import axiosClient from '../../../axiosClient'
import { useRouter } from 'next/router'
import { Container, Typography, Grid, Button, Avatar, styled } from '@mui/material'
import { TAG_DETAIL } from '../../../shared/constants'
import { animateScroll as scroll } from 'react-scroll'

const HeadAbsContainer = styled(Container)({
  position: 'relative',
  height: '80px',
})

const HeadGrid = styled(Grid)({
  position: 'absolute',
  top: '-40px',
})

const HeadStickDiv = styled('div')({
  position: 'fixed',
  top: '0px',
  backgroundColor: 'white',
  width: '100%',
  zIndex: '1',
})

const ToTopButton = styled(Button)({
  borderRadius: '25px',
  position: 'absolute',
  right: '100px',
  top: '5px',
})

const Header = ({ data }) => {
  const HEADER_CONST = TAG_DETAIL.HEADER
  const [isScrollOut, setScrollOut] = useState(false)
  var scrolledOut = false
  // How tf this worked? (cc: Ho Minh Nguyen)
  const handleScroll = () => {
    if (!scrolledOut && window.pageYOffset > HEADER_CONST.OFFSET) {
      setScrollOut(true)
      scrolledOut = true
    } else if (scrolledOut && window.pageYOffset <= HEADER_CONST.OFFSET) {
      setScrollOut(false)
      scrolledOut = false
    }
  }
  const [avatarURL, setAvatarURL] = useState(data.AvatarURL || '/static/avatars/avatar_1.jpg')
  const [imgErr, setImgErr] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  const handleBackToTop = () => {
    scroll.scrollToTop()
  }
  useEffect(() => {
    window.onscroll = handleScroll
  }, [])
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${data.backgroundImgTop})` }}
        className="background-top"
      ></div>
      <HeadAbsContainer sx={{ mb: 5 }}>
        <HeadGrid container display="flex" alignItems="center">
          <Grid item auto>
            <Avatar
              display="inline"
              alt="Tag Avatar"
              src={avatarURL}
              onError={handleImgError}
              sx={{ width: 80, height: 80, m: 3 }}
              style={{
                border: '5px solid white',
              }}
            />
          </Grid>
          <Grid item auto>
            <Typography variant="h6" color="text.primary" display="inline">
              {data.name}
            </Typography>
          </Grid>
        </HeadGrid>
      </HeadAbsContainer>
      {isScrollOut && (
        <HeadStickDiv>
          <Grid container display="flex" alignItems="center" sx={{ px: 5 }}>
            <Grid item>
              <Avatar
                display="inline"
                alt="Tag Avatar"
                src={data.avatarURL}
                sx={{ width: 60, height: 60, mx: 3 }}
                style={{
                  border: '5px solid white',
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="text.primary" display="inline">
                {data.name}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <ToTopButton onClick={handleBackToTop} variant="contained">
                {HEADER_CONST.BACK_TO_TOP}
              </ToTopButton>
            </Grid>
          </Grid>
        </HeadStickDiv>
      )}
    </div>
  )
}

export default Header

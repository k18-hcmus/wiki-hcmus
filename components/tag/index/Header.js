import React, { useState, useEffect } from 'react'
import { Container, Typography, Grid, Button, Avatar, styled } from '@mui/material'
import { TAG_DETAIL, CATEGORY_CONST } from '../../../shared/constants'
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
  const [avatarURL, setAvatarURL] = useState(null)
  const [imgErr, setImgErr] = useState(false)
  const handleImgError = () => {
    if (!imgErr) {
      if (data.Category) {
        if (data.Category.Name === CATEGORY_CONST.TEACHER)
          setAvatarURL('/static/avatars/teacher.png')
        else if (data.Category.Name === CATEGORY_CONST.SUBJECT)
          setAvatarURL('/static/avatars/subject.png')
      } else setAvatarURL('/static/avatars/avatar_1.jpg')
      setImgErr(true)
    }
  }
  const handleBackToTop = () => {
    scroll.scrollToTop()
  }
  useEffect(() => {
    window.onscroll = handleScroll
  }, [])
  useEffect(() => {
    if (!data) return
    if (data.Category) {
      if (data.AvatarURL && data.AvatarURL !== '') setAvatarURL(data.AvatarURL)
      else if (data.Category.Name === CATEGORY_CONST.TEACHER)
        setAvatarURL('/static/avatars/teacher.png')
      else if (data.Category.Name === CATEGORY_CONST.SUBJECT)
        setAvatarURL('/static/avatars/subject.png')
    } else setAvatarURL('/static/avatars/avatar_1.jpg')
  }, [data])
  return (
    <div>
      <div
        style={{ backgroundImage: `url(${data.backgroundImgTop})` }}
        className="background-top"
      ></div>
      <HeadAbsContainer sx={{ mb: 5 }}>
        <HeadGrid container display="flex" alignItems="center">
          <Grid item auto="true">
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
          <Grid item auto="true">
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

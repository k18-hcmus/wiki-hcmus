import React, { useState, useEffect } from 'react'
import { styled, alpha } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
  Grid,
} from '@mui/material'
import {
  Search as SearchIcon,
  AccountCircle,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
  Warning,
} from '@mui/icons-material'
import CustomLink from './CustomLink'
import Login from './Login'
import Register from './Register'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, userLogout } from '../../redux/slices/userSlice'
import axiosClient from '../../axiosClient'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuth(!!localStorage.getItem('token')) //Check authenticate
    }
  }, [])
  const handleOpenLogin = (event) => {
    event.preventDefault()
    setIsLoginOpen(true)
  }
  const handleCloseLogin = () => {
    setIsAuth(!!localStorage.getItem('token'))
    setIsLoginOpen(false)
  }
  const handleOpenRegister = (event) => {
    event.preventDefault()
    setIsRegisterOpen(true)
  }
  const handleCloseRegister = () => {
    setIsRegisterOpen(false)
  }
  const handleLogOut = () => {
    localStorage.clear()
    setIsAuth(!!localStorage.getItem('token'))
    axiosClient.defaults.headers.common['Authorization'] = ``
    router.push('/')
    dispatch(userLogout())
    handleMenuClose()
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      sx={{ mt: '40px' }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  const pages = [
    { page: 'Home', href: '/' },
    { page: 'Teacher', href: '/' },
    { page: 'Subject', href: '/' },
  ]

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Login open={isLoginOpen} handleClose={handleCloseLogin} />
      <Register open={isRegisterOpen} handleClose={handleCloseRegister} />
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {/* TODO: Change to icon */}
            ICON PLACE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>

          {/* TODO: Link Button to direct page */}
          <Box style={{ marginRight: 'auto' }} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <CustomLink key={page.page} href={page.href} page={page.page} />
            ))}
          </Box>

          {/* Create New Post Link Button */}
          {!isAuth ? (
            <Box>
              <Grid container direction="row" spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={handleOpenLogin}>
                    LOGIN
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="warning" onClick={handleOpenRegister}>
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <>
              <Box>
                <CustomLink href="/CreatePost" page="Create Post" />
              </Box>
              {/* Desktop Nav */}
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              {/* Mobile Nav */}
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}

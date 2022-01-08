import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react'
import { fetchUser, changeLoadedUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { fetchTags } from '../redux/slices/tagSlice'
import { LinearProgress } from '@mui/material'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    dispatch(fetchTags())
    if (!localStorage.getItem('token')) {
      dispatch(changeLoadedUser())
      return
    }
    async function fetchAPI() {
      dispatch(fetchUser())
    }
    fetchAPI()
  }, [])
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  )
}

export default Layout

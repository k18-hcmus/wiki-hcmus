import Navbar from '../components/Navbar'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { fetchUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
const Layout = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return
    }
    async function fetchAPI() {
      dispatch(fetchUser())
    }
    fetchAPI()
  }, [dispatch])
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  )
}

export default Layout

import Navbar from '../components/Navbar'
import React, { useEffect } from 'react'
import { fetchUser } from '../redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import { fetchTags } from '../redux/slices/tagSlice'

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTags())
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

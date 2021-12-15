import { Container } from '@mui/material'
import Header from './Header'
import Navbar from '../components/Navbar'
import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      {children}
    </React.Fragment>
  )
}

export default Layout

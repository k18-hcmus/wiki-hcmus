import * as React from 'react'
import { Link, Grid, Button } from '@mui/material'

const pages = [
  { label: 'Users', link: '/admin/UsersActive', color: 'primary' },
  { label: 'Posts', link: '/admin/post', color: 'primary' },
  { label: 'Create Announce', link: '/admin/announce', color: 'primary' },
  { label: 'Feedbacks', link: '/admin', color: 'primary' },
]

const Navbar = () => {
  return (
    <Grid container sx={{p: 1}}>
      {pages.map((page, index) => (
        <Grid key={index} item sx={{mx: 1}}>
          <Link href={page.link} underline="none">
            <Button variant="contained" color={page.color}>
              {page.label}
            </Button>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
}
export default Navbar

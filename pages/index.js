import { Container, Grid } from '@mui/material'
import SidebarHome from '../components/home/SideBarHome'
import ListBriefPost from '../components/home/list-brief-post'
const Home = () => {
  return (
    <Container maxWidth={'false'} sx={{ minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xl={9} xs={6}>
            <ListBriefPost />
          </Grid>
          <Grid item lg={4} md={4} xl={3} xs={6}>
            <SidebarHome />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Home

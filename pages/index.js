import { Box, Button, Card, Container, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { animateScroll as scroll } from 'react-scroll'
import PostNoImageCard from '../components/home/post-no-image-card'
import LinearProgress from '@mui/material/LinearProgress'
import SortPost from '../components/commons/sort-post-controller'
import SidebarHome from '../components/home/SideBarHome'
import axiosClient from '../axiosClient'
import { POST_CONST } from '../shared/post-constants'
import { VIEWOTHER_CONST } from '../shared/profile-constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import ListBriefPost from '../components/home/list-brief-post'
const HorizoneFeature = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
})

const BackToTopButton = styled(Button)({
  width: '200px',
  height: '40px',
  borderRadius: '15px',
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  zIndex: 10,
})
const Home = () => {
  // const [postsData, setPostsData] = useState([])
  // const [visible, setVisible] = useState(false)
  // const [dataOrder, setDataOrder] = useState(POST_CONST.DATA_ORDER.NEW)
  // const [hasMoreData, setHasMoreData] = useState(true)
  // const [start, setStart] = useState(0)
  // const [isloading, setIsloading] = useState(false)
  // const limit = VIEWOTHER_CONST.LIMIT_VIEW
  // const getMoreData = async () => {
  //   try {
  //     const newStart = start + limit
  //     setStart(newStart)
  //     const postResult = await axiosClient.get(
  //       `/posts?&_start=${newStart}&_limit=${limit}&${dataOrder}`
  //     )
  //     if (postResult.data.length === 0) setHasMoreData(false)
  //     else setPostsData([...postsData, ...postResult.data])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const newStart = 0
  //       setStart(newStart)
  //       setHasMoreData(true)
  //       const result = await axiosClient.get(`/posts?&${dataOrder}`)
  //       setPostsData(result.data)
  //     } catch {
  //       console.log('Error get Post at Home')
  //     }
  //   }
  //   fetchData()
  //   window.addEventListener('scroll', () => {
  //     if (window.pageYOffset > 600) {
  //       setVisible(true)
  //     } else {
  //       setVisible(false)
  //     }
  //   })
  // }, [])
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsloading(true)
  //       const newStart = 0
  //       setStart(newStart)
  //       setHasMoreData(true)
  //       const result = await axiosClient.get(`/posts?&${dataOrder}`)
  //       setPostsData(result.data)
  //     } catch {
  //       console.log('Error get Post at Home')
  //     } finally {
  //       setIsloading(false)
  //     }
  //   }
  //   fetchData()
  // }, [dataOrder])
  // const scrollToTop = () => {
  //   scroll.scrollToTop()
  // }
  // const [checked, setChecked] = useState([true, false, false])
  // const options = ['new', 'hot', 'best']
  // const handleDataOptionChange = (option) => {
  //   switch (option) {
  //     case 'hot':
  //       setDataOrder(POST_CONST.DATA_ORDER.HOT)
  //       break
  //     case 'new':
  //       setDataOrder(POST_CONST.DATA_ORDER.NEW)
  //       break
  //     case 'best':
  //       setDataOrder(POST_CONST.DATA_ORDER.BEST)
  //       break
  //   }
  // }
  // const handleCheck = (event) => {
  //   const id = parseInt(event.target.id)
  //   const newChecked = checked.fill(false)
  //   newChecked[id] = true
  //   setChecked(newChecked)
  //   handleDataOptionChange(options[id])
  // }
  // const renderPosts = (
  //   <>
  //     <InfiniteScroll
  //       dataLength={postsData.length}
  //       next={getMoreData}
  //       hasMore={hasMoreData}
  //       loader={<LinearProgress />}
  //     >
  //       <HorizoneFeature>
  //         {postsData.map((post, index) => (
  //           <PostNoImageCard
  //             key={index}
  //             title={post.Title}
  //             user={post.User}
  //             comments={post.Comments.length}
  //             tags={post.Tags}
  //             publishDate={post.published_at}
  //             postVotes={post.PostVotes}
  //             content={post.Content}
  //             id={post.id}
  //           />
  //         ))}
  //         {visible && (
  //           <BackToTopButton color="primary" variant="contained" onClick={scrollToTop}>
  //             Back To Top
  //           </BackToTopButton>
  //         )}
  //       </HorizoneFeature>
  //     </InfiniteScroll>
  //   </>
  // )
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

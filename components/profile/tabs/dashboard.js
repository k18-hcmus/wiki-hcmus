import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import MonthlyContribution from '../dashboard/monthly-contribution'
import LatestPosts from '../dashboard/latest-posts'
import LatestComments from '../dashboard/latest-comment'
import Contributions from '../dashboard/contributions'
import TotalUpvoteDownvote from '../dashboard/total-upvote-downvote'
import TotalContribution from '../dashboard/total-contribution'
import TotalPostComment from '../dashboard/total-post-comment'
import axiosClient from '../../../axiosClient'

const Dashboard = () => {
  const [cPLastMonth, setCPLastMonth] = useState(101)
  const [cPThisMonth, setCPThisMonth] = useState(129)
  const [totalCP, setTotalCP] = useState(1432)
  const [totalUpvote, setTotalUpvote] = useState(213)
  const [totalDownvote, setTotalDownvote] = useState(56)
  const [totalPost, setTotalPost] = useState(19)
  const [totalComment, setTotalComment] = useState(43)
  const [commentData, setCommentData] = useState([])
  const contributionRef = useRef()
  const [cPRawData, setCPRawData] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const id = 1
      try {
        const cPResult = await axiosClient.get(`/contributions?User.id=${id}`)
        const cPRawData = cPResult.data
        setCPRawData(cPRawData)
        contributionRef.current.updateChartData()
        const commentDataResult = await axiosClient.get(`/comments?User.id=${id}`)
        const commentRawData = commentDataResult.data
        setCommentData(commentRawData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <MonthlyContribution cPThisMonth={cPThisMonth} cPLastMonth={cPLastMonth} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalContribution totalCP={totalCP} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalUpvoteDownvote totalUpvote={totalUpvote} totalDownvote={totalDownvote} />
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <TotalPostComment totalPost={totalPost} totalComment={totalComment} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Contributions ref={contributionRef} cPRawData={cPRawData} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <LatestComments sx={{ height: '100%' }} data={commentData} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestPosts />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard

import React, { useEffect, useRef, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import MonthlyContribution from '../dashboard/monthly-contribution'
import LatestPosts from '../dashboard/latest-posts'
import LatestComments from '../dashboard/latest-comment'
import Contributions from '../dashboard/contributions'
import TotalUpvoteDownvote from '../dashboard/total-upvote-downvote'
import TotalContribution from '../dashboard/total-contribution'
import TotalPostComment from '../dashboard/total-post-comment'
import { getTotalContribution, getMonthlyContribution } from '../../../utils/contribution-utils'
import { getUserTotalVote } from '../../../utils/vote-utils'


const Dashboard = ({ userData, updateReduxData }) => {
  const [cPLastMonth, setCPLastMonth] = useState(0)
  const [cPThisMonth, setCPThisMonth] = useState(0)
  const [totalCP, setTotalCP] = useState(0)
  const [totalUpvote, setTotalUpvote] = useState(0)
  const [totalDownvote, setTotalDownvote] = useState(0)
  const [totalPost, setTotalPost] = useState(0)
  const [totalComment, setTotalComment] = useState(0)
  const [commentData, setCommentData] = useState([])
  const contributionRef = useRef()
  const [cPRawData, setCPRawData] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        if (!userData)
          return
        setCPRawData(userData)
        contributionRef.current.updateChartData()
        setCommentData(userData.Comments)
        const totalCP = await getTotalContribution('object', userData)
        setTotalCP(totalCP)
        const [lastMonthCP, thisMonthCP] = await getMonthlyContribution('object', userData)
        setCPLastMonth(lastMonthCP)
        setCPThisMonth(thisMonthCP)
        const [upvoteSum, downvoteSum] = await getUserTotalVote('object', userData)
        setTotalUpvote(upvoteSum)
        setTotalDownvote(downvoteSum)
        setTotalPost(userData.Posts.length)
        setTotalComment(userData.Comments.length)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userData])
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
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
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestPosts data={userData.Posts}/>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestComments data={commentData} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Dashboard

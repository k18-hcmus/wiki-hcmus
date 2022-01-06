import React, { useEffect, useState } from 'react'
import { Grid, Container, Box, Typography } from '@mui/material'
import Views from '../../components/admin/dashboard/views'
import Navbar from '../../components/admin/dashboard/navbar'
import axiosClient from '../../axiosClient'
import { format } from 'date-fns'

const Dashboard = () => {
  const [chartData, setChartData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResult = await axiosClient.get('/posts')
        const commentResult = await axiosClient.get('/comments')
        const userResult = await axiosClient.get('/account-users')
        const allData = []
        const dataObject = { views: {}, posts: {}, comments: {}, users: {} }
        const lastDate = new Date(new Date().setDate(new Date().getDate() - 31))
        for (let i = 0; i < 30; i++) {
          let curDate = new Date(new Date().setDate(new Date().getDate() - i))
          dataObject.posts[format(curDate, 'MM/dd')] = 0
          dataObject.comments[format(curDate, 'MM/dd')] = 0
          dataObject.users[format(curDate, 'MM/dd')] = 0
        }
        postResult.data.forEach((post) => {
          const postDate = new Date(post.created_at)
          if (postDate > lastDate) dataObject.posts[format(postDate, 'MM/dd')] += 1
        })
        commentResult.data.forEach((post) => {
          const commentDate = new Date(post.created_at)
          if (commentDate > lastDate) dataObject.comments[format(commentDate, 'MM/dd')] += 1
        })
        userResult.data.forEach((post) => {
          const userDate = new Date(post.created_at)
          if (userDate > lastDate) dataObject.users[format(userDate, 'MM/dd')] += 1
        })
        Object.keys(dataObject.posts).forEach((key) => {
          allData.push({ date: key, value: Math.floor(Math.random() * 900 + 100), type: 'Views' })
          allData.push({ date: key, value: dataObject.posts[key], type: 'Posts' })
          allData.push({ date: key, value: dataObject.comments[key], type: 'Comments' })
          allData.push({ date: key, value: dataObject.users[key], type: 'Users' })
        })
        setChartData(allData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Container>
      <Grid container display="flex" alignItems="center" justifyContent="Center" sx={{mt: 1, p: 1}}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Grid container display="flex" alignItems="center">
            <Grid item>
              <Typography textAlign="center" color="text.primary" variant="h5">
                Admin Dashboard
              </Typography>
            </Grid>
            <Grid item>
              <Navbar />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Views data={chartData} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard

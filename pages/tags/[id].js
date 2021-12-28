import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import axiosClient from '../../axiosClient'
import { useRouter } from 'next/router'
import { Box, Container, Tab, Tabs, Typography, Grid, Paper, Avatar, styled } from '@mui/material'
import Header from '../../components/tag/index/Header'
import Content from '../../components/tag/index/Content'
import SidebarDetail from '../../components/tag/index/SidebarDetail'
import { getTagTotalVote } from '../../utils/vote-utils'

const Tag = () => {
  const router = useRouter()
  const { id } = router.query
  const [sidebarDetailData, setSidebarDetailData] = useState({
    description: null,
    postNum: 0,
    createdDate: null,
    voteNum: 0,
    relatedTags: []
  })
  const [postData, setPostData] = useState([])
  const handlePostSortChange = (option) => {
    switch (option) {
      case 'hot':
        break
      case 'new':
        break
      case 'best':
        break
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const results = await axiosClient.get(`/tags?id=${id}`)
        var tagObject = results.data[0]
        const [upvoteSum, downvoteSum] = await getTagTotalVote('object', tagObject)
        const sidebarDetail = {
          description: tagObject.Description,
          postNum: tagObject.Posts.length,
          createdDate: format(new Date(tagObject.created_at), 'MMM dd, yyyy'),
          voteNum: upvoteSum - downvoteSum,
          relatedTags: tagObject.RelatedTags
        }
        setSidebarDetailData(sidebarDetail)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])
  const backgroundImgBody = '/static/backgroundImgs/tag_2.jpg'
  const headerData = {
    avatarURL: '/static/avatars/avatar_1.jpg',
    backgroundImgTop: '/static/backgroundImgs/tag_1.jpg',
    name: 'Trương Toàn Thịnh',
  }

  return (
    <div>
      <Header data={headerData} />
      <div style={{ backgroundImage: `url(${backgroundImgBody})` }} className="background-body">
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xl={9} xs={6}>
              <Content data={postData} callbackSetDataOption={handlePostSortChange}/>
            </Grid>
            <Grid item lg={4} md={4} xl={3} xs={6}>
              <SidebarDetail data={sidebarDetailData} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Tag

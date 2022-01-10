import React, { useState, useEffect } from 'react'
import { Container, Grid } from '@mui/material'
import SidebarHome from '../components/home/SideBarHome'
import ListBriefPost from '../components/home/list-brief-post'
import { getTags } from '../redux/slices/tagSlice'
import { useSelector } from 'react-redux'
import { format } from 'date-fns'
import { getTagTotalVote } from '../utils/vote-utils'
const Home = () => {
  const [tagData, setTagData] = useState([])
  const tagArray = useSelector(getTags)
  useEffect(() => {
    const fetchData = async () => {
      if (tagArray && tagArray.length !== 0) {
        let tagDetails = tagArray.map((tag) => {
          return {
            id: tag.id,
            name: tag.Name,
            description: tag.Description,
            postNum: tag.Posts.length,
            createdDate: format(new Date(tag.created_at), 'MMM dd, yyyy'),
            majors: tag.Majors,
            color: tag.ColorTag,
          }
        })
        await tagDetails.forEach(async (tag, index) => {
          const [upvoteSum, downvoteSum] = await getTagTotalVote('object', tagArray[index])
          tagDetails[index].voteNum = upvoteSum - downvoteSum
        })
        setTagData(tagDetails)
      }
    }
    fetchData()
  }, [tagArray])
  return (
    <Container maxWidth={'false'} sx={{ minHeight: '100vh', backgroundColor: '#F4F6F8' }}>
      <Container sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xl={9} xs={6}>
            <ListBriefPost />
          </Grid>
          <Grid item lg={4} md={4} xl={3} xs={6}>
            <SidebarHome tagData={tagData} />
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default Home

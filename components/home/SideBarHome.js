import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  Avatar,
  LinearProgress,
} from '@mui/material'
import { COLOR_SET } from '../../shared/constants'
import { HOME_DETAIL } from '../../shared/home-constants'
import AbstractTag from '../commons/abstract-tag'
import InfiniteScroll from 'react-infinite-scroll-component'
const SidebarHome = ({ tagData }) => {
  const DETAIL_CONST = HOME_DETAIL.SIDEBAR_DETAIL
  const [Tags, setTags] = useState([])
  const [hasMoreData, setHasMoreData] = useState(true)
  const [start, setStart] = useState(0)
  const limit = 5
  const getMoreData = () => {
    try {
      const end = start + limit
      setStart(end)
      if (tagData.length <= start) setHasMoreData(false)
      else {
        const tagArr = tagData.slice(start, end)
        setTags([...Tags, ...tagArr])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newStart = 0
        setStart(newStart)
        setHasMoreData(true)
        setTags(tagData.slice(newStart, limit))
      } catch {
        console.log('Error get Post at Home')
      }
    }
    fetchData()
  }, [tagData])
  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={<Typography variant="body1">{DETAIL_CONST.ABOUT.TITLE}</Typography>}
        />
        <CardContent>
          <Grid container direction={'row'} justifyContent={'flex-start'} alignContent={'center'}>
            <Grid item>
              <Avatar
                variant="square"
                sx={{ width: 50, height: 50 }}
                src={'/static/illustrations/robot.png'}
              />
            </Grid>
            <Grid item>
              <Typography color="text.primary" variant="body2" sx={{ mb: 2 }}>
                {DETAIL_CONST.ABOUT.WELLCOME}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
            {DETAIL_CONST.ABOUT.BODY}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {DETAIL_CONST.EXTRA_TITLE}
          </Typography>
        </CardContent>
      </Card>
      <InfiniteScroll
        dataLength={Tags.length}
        next={getMoreData}
        hasMore={hasMoreData}
        loader={<LinearProgress />}
      >
        {Tags.map((tag, index) => (
          <AbstractTag key={index} data={tag} />
        ))}
      </InfiniteScroll>
    </>
  )
}
export default SidebarHome

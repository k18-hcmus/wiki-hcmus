import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import axiosClient from '../../axiosClient'
import { useRouter } from 'next/router'
import { Container, Grid } from '@mui/material'
import Header from '../../components/tag/index/Header'
import Content from '../../components/tag/index/Content'
import SidebarDetail from '../../components/tag/index/SidebarDetail'
import { getTagTotalVote } from '../../utils/vote-utils'
import { VIEWOTHER_CONST, POST_CONST } from '../../shared/constants'
import { getAccUser } from '../../redux/slices/userSlice'
import { getTags } from '../../redux/slices/tagSlice'
import { useSelector } from 'react-redux'

const Tag = () => {
  const router = useRouter()
  const { id } = router.query
  const [sidebarDetailData, setSidebarDetailData] = useState({
    description: null,
    postNum: 0,
    createdDate: null,
    voteNum: 0,
    relatedTags: [],
    majors: [],
  })
  const [headerData, setHeaderData] = useState({
    avatarURL: '/static/avatars/avatar_1.jpg',
    backgroundImgTop: '/static/backgroundImgs/tag_1.jpg',
    name: '',
  })
  const [backgroundImgBody, setBackgroundImgBody] = useState('/static/backgroundImgs/tag_2.jpg')
  const [postData, setPostData] = useState([])
  const [ownUserData, setOwnUserData] = useState({
    id: null,
  })
  const userDataObject = useSelector(getAccUser)
  useEffect(() => {
    if (userDataObject && Object.keys(userDataObject).length !== 0) {
      setOwnUserData(userDataObject)
    }
  }, [userDataObject])
  const [tagData, setTagData] = useState([])
  const tagObject = useSelector(getTags)
  useEffect(() => {
    if (tagObject && tagObject.length !== 0) {
      setTagData(tagObject)
    }
  }, [tagObject])
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return
        const results = await axiosClient.get(`/tags?id=${id}`)
        var tagObject = results.data[0]
        const [upvoteSum, downvoteSum] = await getTagTotalVote('object', tagObject)
        const postResults = await axiosClient.get(`/posts?Tags.id=${id}`)
        let relatedTags = {}
        postResults.data.forEach((post) => {
          if (post.Tags) post.Tags.forEach((tag) => (relatedTags[tag.id] = tag))
        })
        const sidebarDetail = {
          description: tagObject.Description,
          postNum: tagObject.Posts.length,
          createdDate: format(new Date(tagObject.created_at), 'MMM dd, yyyy'),
          voteNum: upvoteSum - downvoteSum,
          relatedTags: Object.keys(relatedTags).map((key) => relatedTags[key]),
          majors: tagObject.Majors,
        }
        setSidebarDetailData(sidebarDetail)
        const headerDetail = {
          avatarURL: tagObject.AvatarURL || '/static/avatars/avatar_1.jpg',
          backgroundImgTop: tagObject.BackgroundTopURL || '/static/backgroundImgs/tag_1.jpg',
          name: tagObject.Name,
        }
        setHeaderData(headerDetail)
        setBackgroundImgBody(tagObject.BackgroundBodyURL || '/static/backgroundImgs/tag_2.jpg')
        const postResult = await axiosClient.get(
          `/posts?Tags.id=${id}&_start=${start}&_limit=${limit}&${POST_CONST.DATA_ORDER.NEW}`
        )
        setPostData(postResult.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [id])
  const [hasMoreData, setHasMoreData] = useState(true)
  const [start, setStart] = useState(0)
  const limit = VIEWOTHER_CONST.LIMIT_VIEW
  const [dataOrder, setDataOrder] = useState(POST_CONST.DATA_ORDER.NEW)
  const getMoreData = async () => {
    if (!id) return
    try {
      const newStart = start + limit
      setStart(newStart)
      const postResult = await axiosClient.get(
        `/posts?Tags.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
      )
      if (postResult.data.length === 0) setHasMoreData(false)
      else setPostData([...postData, ...postResult.data])
    } catch (error) {
      console.log(error)
    }
  }
  // const handleChange = (event, newValue) => {
  //   setValue(newValue)
  // }
  const handleDataOptionChange = (option) => {
    switch (option) {
      case 'hot':
        setDataOrder(POST_CONST.DATA_ORDER.HOT)
        break
      case 'new':
        setDataOrder(POST_CONST.DATA_ORDER.NEW)
        break
      case 'best':
        setDataOrder(POST_CONST.DATA_ORDER.BEST)
        break
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        if (!id) return
        const newStart = 0
        setStart(newStart)
        setHasMoreData(true)
        const postResult = await axiosClient.get(
          `/posts?Tags.id=${id}&_start=${newStart}&_limit=${limit}&${dataOrder}`
        )
        setPostData(postResult.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [dataOrder])
  return (
    <div>
      <Header data={headerData} />
      <div style={{ backgroundImage: `url(${backgroundImgBody})` }} className="background-body">
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={8} md={8} xl={9} xs={6}>
              <Content
                data={postData}
                ownUserId={ownUserData.id}
                callbackSetDataOption={handleDataOptionChange}
                hasMoreData={hasMoreData}
                callbackLoadData={getMoreData}
              />
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

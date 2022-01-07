import React, { useState } from 'react'
import { Paper, Box, LinearProgress } from '@mui/material'
import AbstractPost from '../../commons/abstract-post'
import InfiniteScroll from 'react-infinite-scroll-component'
import SortPost from '../../commons/sort-post-controller'
import PostNoImageCard from '../../home/post-no-image-card'

const Content = ({
  data,
  callbackSetDataOption,
  ownUserId,
  hasMoreData,
  callbackLoadData,
  isAdmin,
  deletePost
}) => {
  const [checked, setChecked] = useState([true, false, false])
  const options = ['new', 'hot', 'best']
  const handleCheck = (event) => {
    const newChecked = checked.filter(() => false)
    const id = parseInt(event.target.id)
    newChecked[id] = true
    setChecked(newChecked)
    callbackSetDataOption(options[id])
  }
  return (
    <div>
      <SortPost checked={checked} handleCheck={handleCheck} />
      <InfiniteScroll
        dataLength={data.length}
        next={callbackLoadData}
        hasMore={hasMoreData}
        loader={<LinearProgress />}
      >
        <Box sx={{ px: 1 }}>
          {data.map((post, index) =>
            isAdmin ? (
              <PostNoImageCard deletePost={deletePost} key={index} post={post} isAdmin />
            ) : (
              <PostNoImageCard deletePost={deletePost} key={index} post={post} />
            )
          )}
        </Box>
      </InfiniteScroll>
    </div>
  )
}

export default Content

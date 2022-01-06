import React, { useState } from 'react'
import { Paper, Box, LinearProgress } from '@mui/material'
import AbstractPost from '../../commons/abstract-post'
import InfiniteScroll from 'react-infinite-scroll-component'
import SortPost from '../../commons/sort-post-controller'

const Content = ({ data, callbackSetDataOption, ownUserId, hasMoreData, callbackLoadData }) => {
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
          {data.map((record, index) => (
            <Paper key={index} sx={{ mb: 3, p: 1 }} elevation={3}>
              <AbstractPost key={index} data={record} ownUserId={ownUserId} />
            </Paper>
          ))}
        </Box>
      </InfiniteScroll>
    </div>
  )
}

export default Content

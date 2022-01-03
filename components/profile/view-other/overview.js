import React, { useEffect, useState } from 'react'
import {
  FormGroup,
  Paper,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
  Box,
} from '@mui/material'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined'
import NewReleasesIcon from '@mui/icons-material/NewReleases'
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import StarIcon from '@mui/icons-material/Star'
import AbstractPost from '../../commons/abstract-post'
import InfiniteScroll from 'react-infinite-scroll-component'

const Overview = ({ data, ownUserId, callbackSetDataOption, callbackLoadData, hasMoreData }) => {
  const [checked, setChecked] = useState([true, false, false])
  const options = ['hot', 'new', 'best']
  const handleCheck = (event) => {
    const newChecked = checked.filter(() => false)
    newChecked[event.target.id] = true
    setChecked(newChecked)
    callbackSetDataOption(options[event.target.id])
  }
  return (
    <div>
      <Paper sx={{ mb: 3, px: 2, py: 1 }} elevation={3}>
        <FormGroup>
          <Grid container>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={0}
                    checked={checked[0]}
                    onChange={handleCheck}
                    icon={<WhatshotOutlinedIcon />}
                    checkedIcon={<WhatshotIcon />}
                  />
                }
                label="Hot"
              />
            </Grid>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={1}
                    checked={checked[1]}
                    onChange={handleCheck}
                    icon={<NewReleasesOutlinedIcon />}
                    checkedIcon={<NewReleasesIcon />}
                  />
                }
                label="New"
              />
            </Grid>
            <Grid item auto>
              <FormControlLabel
                control={
                  <Checkbox
                    id={2}
                    checked={checked[2]}
                    onChange={handleCheck}
                    icon={<StarBorderOutlinedIcon />}
                    checkedIcon={<StarIcon />}
                  />
                }
                label="Best"
              />
            </Grid>
          </Grid>
        </FormGroup>
      </Paper>
      <InfiniteScroll
        dataLength={data.length}
        next={callbackLoadData}
        hasMore={hasMoreData}
        loader={<LinearProgress />}
        // endMessage={}
      >
        <Box sx={{ px: 1 }}>
          {data.map((record, index) => (
            <Paper key={index} sx={{ mb: 3, p: 1 }} elevation={3}>
              <AbstractPost data={record} ownUserId={ownUserId} />
            </Paper>
          ))}
        </Box>
      </InfiniteScroll>
    </div>
  )
}

export default Overview

import React from 'react'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import LazyLoad from 'react-lazyload'
import FollowTab from '../follow/follow-tab';
import TabPanel from '../follow/tab-pannel';


const Follow = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Follows" />
          <Tab label="Followers" />
        </Tabs>
      </Box>
      <Box pt={2}>
        <LazyLoad once={true}>
          <TabPanel value={value} index={0}>
            <FollowTab />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={1}>
            <FollowTab />
          </TabPanel>
        </LazyLoad>
      </Box>
    </Container>
  )
}

export default Follow

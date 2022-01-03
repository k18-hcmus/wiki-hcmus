import React, { useState, useEffect } from 'react'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import LazyLoad from 'react-lazyload'
import Information from '../../components/profile/tabs/information.js'
import History from '../../components/profile/tabs/history.js'
import Follow from '../../components/profile/tabs/follow.js'
import Setting from '../../components/profile/tabs/setting.js'
import Dashboard from '../../components/profile/tabs/dashboard.js'
import TabPanel from '../../components/profile/commons/tab-panel'
import { getUser, getAccUser, userUpdateDetail } from '../../redux/slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const Profile = () => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [userData, setUserData] = useState({
    DisplayName: '',
    AvatarURL: null,
    Comments: [],
    Posts: [],
    Contributions: [],
    FollowUsers: [],
    FollowedByUsers: [],
    Email: '',
  })
  const userDataObject = useSelector(getAccUser)
  const userObject = useSelector(getUser)
  const updateReduxUserDetail = (property, data) => {
    const currentDataObject = useSelector(getAccUser)
    useDispatch(userUpdateDetail({ ...currentDataObject, [property]: data }))
  }
  useEffect(() => {
    const fetchData = async () => {
      if (
        userDataObject &&
        userObject &&
        Object.keys(userDataObject).length !== 0 &&
        Object.keys(userObject).length !== 0
      ) {
        try {
          setUserData({
            ...userDataObject,
            Email: userObject.email,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchData()
  }, [userDataObject, userObject])
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dashboard" {...allyProps(0)} />
          <Tab label="Information" {...allyProps(1)} />
          <Tab label="Follows" {...allyProps(2)} />
          <Tab label="History" {...allyProps(3)} />
          <Tab label="Settings" {...allyProps(4)} />
        </Tabs>
      </Box>
      <Box pt={4}>
        <LazyLoad once={true}>
          <TabPanel value={value} index={0}>
            <Dashboard userData={userData} updateReduxData={updateReduxUserDetail} />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={1}>
            <Information userData={userData} updateReduxData={updateReduxUserDetail} />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={2}>
            <Follow userData={userData} updateReduxData={updateReduxUserDetail} />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={3}>
            <History userData={userData} updateReduxData={updateReduxUserDetail} />
          </TabPanel>
        </LazyLoad>
        <LazyLoad once={true}>
          <TabPanel value={value} index={5}>
            <Setting userData={userData} updateReduxData={updateReduxUserDetail} />
          </TabPanel>
        </LazyLoad>
      </Box>
    </Container>
  )
}

export default Profile

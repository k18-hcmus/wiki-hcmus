import React, { useEffect, useState } from 'react'
import { Grid, Card, CardHeader, CardContent, Avatar, Box, Badge, Button } from '@mui/material'
import EditSelect from '../information/edit-select'
import EditTextInput from '../information/edit-text-input'
import ProfileCell from '../information/profile-cell'
import axiosClient from '../../../axiosClient'
import { INFORMATION_CONST, HISTORY_CONST } from '../../../shared/constants'
import { addHistory } from '../../../utils/history-utils'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios'

const Information = () => {
  const [userData, setUserData] = useState({
    id: null,
    DisplayName: null,
    Email: null,
    Gender: null,
    Phone: null,
    UserType: null,
  })
  const [avatarURL, setAvatarURL] = useState('')
  const saveChangeInfomation = async (property, value) => {
    const newUserData = {
      [property]: value,
    }
    setUserData({ ...userData, [property]: value })
    const result = await axiosClient({
      method: 'put',
      url: `/account-users/${userData.id}`,
      data: newUserData,
      headers: {},
    })
    if (result) {
      addHistory(
        { const: HISTORY_CONST.ACTOR.SELF, id: userData.id },
        { const: HISTORY_CONST.ACTION.UPDATE },
        { const: HISTORY_CONST.TARGET.PROFILE, id: userData.id }
      )
    }
  }
  const handleUserDataChange = (property, value) => {
    saveChangeInfomation(property, value)
  }
  const handleAvatarChange = async(evt) => {
    const files = evt.target.files
    if (!files || !files.length) 
      return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'wiki-hcmus')
    try {
      const respone = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formData)
      setAvatarURL(respone.data.secure_url)
      saveChangeInfomation('AvatarURL', respone.data.secure_url)
    } catch (e) {
      console.log('caught error')
      console.error(e)
    }
  }
  useEffect(() => {
    async function fetchData() {
      const id = 1
      try {
        const results = await axiosClient.get(`/account-users?id=${id}`)
        const data = results.data[0]
        setAvatarURL(data.AvatarURL || '/static/avatars/avatar_1.jpg')
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} xl={4} xs={12}>
        <Card>
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CardHeader
              // avatar={<Avatar alt="user avatar" src={avatarURL} sx={{ width: 120, height: 120 }} align='center'/>}
              avatar={
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                  <Button
                    component="label"
                  >
                    <Avatar><AddPhotoAlternateIcon /></Avatar>
                    <input
                      accept="image/*"
                      type="file"
                      onChange={handleAvatarChange}
                      hidden
                    />
                  </Button>
                  }
                >
                  <Avatar
                    alt="user avatar"
                    src={avatarURL}
                    sx={{ width: 120, height: 120 }}
                    align="center"
                  />
                </Badge>
              }
            />
          </Box>
          <CardContent>
            
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={8} md={8} xl={8} xs={12}>
        <ProfileCell
          uid={userData.id}
          property="DisplayName"
          label="Display Name"
          value={userData.DisplayName}
          setValue={handleUserDataChange}
          BaseEditComponent={<EditTextInput defaultValue={userData.DisplayName} />}
        />
        <ProfileCell
          uid={userData.id}
          property="Email"
          label="Email"
          value={userData.Email}
          setValue={handleUserDataChange}
          BaseEditComponent={<EditTextInput defaultValue={userData.Email} />}
        />
        <ProfileCell
          uid={userData.id}
          property="Gender"
          label="Gender"
          value={userData.Gender}
          setValue={handleUserDataChange}
          BaseEditComponent={
            <EditSelect
              label="Gender"
              currentValue={userData.Gender}
              values={INFORMATION_CONST.GENDER}
            />
          }
        />
        <ProfileCell
          uid={userData.id}
          property="Phone"
          label="Phone"
          value={userData.Phone}
          setValue={handleUserDataChange}
          BaseEditComponent={<EditTextInput defaultValue={userData.Phone} />}
        />
        <ProfileCell label="User Type" value={userData.UserType} disabled />
      </Grid>
    </Grid>
  )
}

export default Information

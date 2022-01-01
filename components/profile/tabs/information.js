import React, { useEffect, useState } from 'react'
import { Grid, Card, CardHeader, CardContent, Avatar, Box, Badge, Button, Typography } from '@mui/material'
import EditSelect from '../information/edit-select'
import EditTextInput from '../information/edit-text-input'
import ProfileCell from '../information/profile-cell'
import axiosClient from '../../../axiosClient'
import { INFORMATION_CONST, HISTORY_CONST } from '../../../shared/constants'
import { addHistory } from '../../../utils/history-utils'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import axios from 'axios'

const Information = ({ user, userData, updateReduxData }) => {
  const [data, setData] = useState({
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
    setData({ ...data, [property]: value })
    const result = await axiosClient({
      method: 'put',
      url: `/account-users/${data.id}`,
      data: newUserData,
      headers: {},
    })
    updateReduxData(property, value)
    if (result) {
      addHistory(
        { const: HISTORY_CONST.ACTOR.SELF, id: data.id },
        { const: HISTORY_CONST.ACTION.UPDATE },
        { const: HISTORY_CONST.TARGET.PROFILE, id: data.id }
      )
    }
  }
  const handleUserDataChange = (property, value) => {
    saveChangeInfomation(property, value)
  }
  const handleAvatarChange = async (evt) => {
    const files = evt.target.files
    if (!files || !files.length) return
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'wiki-hcmus')
    try {
      const respone = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formData)
      setAvatarURL(respone.data.secure_url)
      saveChangeInfomation('AvatarURL', respone.data.secure_url)
    } catch (e) {
      console.log('caught error')
      console.log(e)
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        setAvatarURL(userData.AvatarURL || '/static/avatars/avatar_1.jpg')
        setData(userData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [userData])
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} xl={4} xs={12}>
        <Card>
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CardHeader
              avatar={
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <Button component="label">
                      <Avatar>
                        <AddPhotoAlternateIcon />
                      </Avatar>
                      <input accept="image/*" type="file" onChange={handleAvatarChange} hidden />
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
            <Typography variant='body1' color='text.primary'>
              {INFORMATION_CONST.LABEL.EMAIL}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
            {data.Email}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={8} md={8} xl={8} xs={12}>
        <ProfileCell
          uid={data.id}
          property="DisplayName"
          label={INFORMATION_CONST.LABEL.DISPLAY_NAME}
          value={data.DisplayName}
          setValue={handleUserDataChange}
          BaseEditComponent={<EditTextInput defaultValue={data.DisplayName} />}
        />
        <ProfileCell
          uid={data.id}
          property="Gender"
          label={INFORMATION_CONST.LABEL.GENDER}
          value={data.Gender}
          setValue={handleUserDataChange}
          BaseEditComponent={
            <EditSelect
              label="Gender"
              currentValue={data.Gender}
              values={INFORMATION_CONST.GENDER}
            />
          }
        />
        <ProfileCell
          uid={data.id}
          property="Phone"
          label={INFORMATION_CONST.LABEL.PHONE}
          value={data.Phone}
          setValue={handleUserDataChange}
          BaseEditComponent={<EditTextInput defaultValue={data.Phone} />}
        />
      </Grid>
    </Grid>
  )
}

export default Information

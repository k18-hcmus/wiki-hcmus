import React, { useEffect, useState } from 'react'
import {
  Container,
} from '@mui/material'
import EditSelect from '../information/edit-select';
import EditTextInput from '../information/edit-text-input';
import ProfileCell from '../information/profile-cell';
import axiosClient from '../../../axiosClient'
import { INFORMATION_CONST } from '../../../shared/constants';

const Information = () => {
  const [userData, setUserData] = useState({
    id: null,
    DisplayName: null,
    Email: null,
    Gender: null,
    Phone: null,
    UserType: null,
  })
  const handleUserDataChange = (property, value) => {
    const newUserData = {
      ...userData,
      [property]: value,
    }
    setUserData(newUserData)
    axiosClient({
      method: 'put',
      url: `/account-users/${newUserData.id}`,
      data: newUserData,
      headers: {},
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    async function fetchData() {
      const id = 1
      try {
        const results = await axiosClient.get(`/account-users?id=${id}`)
        const data = results.data[0]
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  return (
    <Container>
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
          <EditSelect label="Gender" currentValue={userData.Gender} values={INFORMATION_CONST.GENDER} />
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
    </Container>
  )
}

export default Information

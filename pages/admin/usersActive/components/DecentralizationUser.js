import React from 'react'
import axiosClient from '../../../../axiosClient'
function DecentralizationUser({ UserDetail }) {
  const { id } = UserDetail
  const [user, setUser] = useState()
  useEffect(() => {
    async function FetchUser() {
      const response = await axiosClient.get(`/account-users/${id}`)
      setUser(response.data)
    }
    FetchUser()
  }, [])
  return <div>Enter</div>
}

export default DecentralizationUser

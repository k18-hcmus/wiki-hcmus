import * as React from 'react'
import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import UserMoreMenu from './usersActive/components/UserMoreMenu'
import UserListToolbar from './usersActive/components/UserListToolbar'
import { TablePagination } from '@mui/material'
import { Card } from '@mui/material'

import axiosClient from '../../axiosClient'
import { useEffect } from 'react'
import styled from '@emotion/styled'
import { formatDistanceToNow } from 'date-fns'
import { getTotalContribution, getUserTier } from '../../utils/contribution-utils'

const CustomPagination = styled.div`
  display: 'flex';
`
export default function Users() {
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [filterName, setFilterName] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [userList, setUserList] = useState([])
  const [disable, setDisable] = useState(true)
  const [user, setUser] = useState({})
  const [userCached, setUserCached] = useState()
  const [totalUser, setTotalUser] = useState()

  const handleFilterByName = (event) => {
    setFilterName(event.target.value)
    if (filterName.length > 0) {
      let temp = totalUser.filter((user) => {
        return user.DisplayName.match(filterName)
      })
      setUserList(temp)
    }
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDelUser = (data, userDel) => {
    setUserList(data)
    setDisable(false)
    setUser(userDel)
  }
  const handleSubmitDelUser = async () => {
    const response = await axiosClient.delete(`/account-users/${user[0].id}`)
    setDisable(true)
  }
  const handleUndo = () => {
    setUserList(userCached)
    setDisable(false)
    setDisable(true)
  }
  useEffect(() => {
    async function FetchUser() {
      try {
        const response = await axiosClient.get('/account-users')
        let users = response.data
        await response.data.forEach(async (user, index) => {
          users[index].contribution = await getTotalContribution('object', user)
          users[index].tier = getUserTier(users[index].contribution)[0]
        })
        setUserList(users)
        setUserCached(users)
        setTotalUser(users)
      } catch (error) {
        console.log(error)
      }
    }

    FetchUser()
  }, [])
  return (
    <div>
      <Card sx={{ mt: 5 }}>
        <UserListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">DisplayName</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Created_at</TableCell>
                <TableCell align="left">Contribution</TableCell>
                <TableCell align="left">Tier</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {user.DisplayName}
                  </TableCell>
                  <TableCell align="left">{user.Email}</TableCell>
                  <TableCell align="left">
                    {formatDistanceToNow(new Date(user.created_at))}
                  </TableCell>
                  <TableCell align="left">{user.contribution}</TableCell>
                  <TableCell align="left">{user.tier}</TableCell>
                  <TableCell align="left">{user.Status}</TableCell>
                  <TableCell align="left">
                    <UserMoreMenu
                      UserDetail={user}
                      key={user.id}
                      allUsers={userList}
                      handleDelUser={handleDelUser}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={25}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      </Card>
      <Button
        variant="outlined"
        sx={{ mt: 3, ml: 2 }}
        disabled={disable}
        onClick={handleSubmitDelUser}
      >
        SAVE
      </Button>
      <Button variant="outlined" sx={{ mt: 3, ml: 2 }} disabled={disable} onClick={handleUndo}>
        undo
      </Button>
    </div>
  )
}

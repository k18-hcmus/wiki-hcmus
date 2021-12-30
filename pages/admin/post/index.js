import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import axiosClient from '../../../axiosClient'
import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { CardActions } from '@mui/material'
import { BUTTON_POST } from '../../../shared/constants'
function ListPost() {
  const router = useRouter()
  const [listPost, setListPost] = React.useState()
  const [selectionModel, setSelectionModel] = React.useState()
  const [disableDelete, setDisableDelete] = useState(true)
  const [cachedPost, setCachedPost] = useState()
  const [disable, setDisable] = useState(true)
  const [delPost, setDelPost] = useState({})

  useEffect(() => {
    async function FetchPost() {
      const result = await axiosClient.get('/posts')
      setListPost(result.data)
      setCachedPost(result.data)
    }
    FetchPost()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Title', headerName: 'title', width: 300 },
    { field: 'ViewCount', headerName: 'ViewCount', width: 100 },
    {
      field: 'UpvoteCount',
      headerName: 'UpvoteCount',
      width: 120,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 100,
    },

    {
      field: 'Action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                router.push(`/admin/post/${params.row.id}`)
              }}
            >
              <EditIcon />
            </Button>
          </>
        )
      },
    },
  ]
  const handleClickDelPost = async () => {
    let tempPost = await listPost.filter((p) => p.id !== selectionModel[0])
    let temp = await listPost.filter((p) => p.id === selectionModel[0])
    setDelPost(temp)
    setListPost(tempPost)
    setDisableDelete(true)
    setDisable(false)
  }
  const handleClickUndo = () => {
    setListPost(cachedPost)
    setDisable(true)
  }
  const handleClickSave = async () => {
    console.log('idPost:', delPost[0].id)
    let id = delPost[0].id
    console.log('id:', id)
    await axiosClient.delete(`/posts/${id}`)
    setDisable(true)
  }
  return (
    <div style={{ height: 400, width: '80%', marginLeft: 40, marginTop: 30 }}>
      <DataGrid
        rows={listPost}
        columns={columns}
        disableSelectionOnClick
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          setSelectionModel(ids)
          setDisableDelete(false)
        }}
      />
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickDelPost}
          disabled={disableDelete}
        >
          {BUTTON_POST.Delete.label}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickUndo} disabled={disable}>
          {BUTTON_POST.Undo.label}
        </Button>
        <Button variant="contained" color="primary" onClick={handleClickSave} disabled={disable}>
          {BUTTON_POST.Save.label}
        </Button>
      </CardActions>
    </div>
  )
}
export default ListPost

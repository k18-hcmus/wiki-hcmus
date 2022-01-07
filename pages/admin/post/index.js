import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import axiosClient from '../../../axiosClient'
import { Button, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useRouter } from 'next/router'
import { CardActions, Grid } from '@mui/material'
import { BUTTON_POST } from '../../../shared/constants'
import { TAG_STATUS } from '../../../shared/tag-constants'
import { formatDistanceToNow, format } from 'date-fns'

function ListPost() {
  const router = useRouter()
  const [listPost, setListPost] = React.useState()
  const [selectionModel, setSelectionModel] = React.useState()
  const [disableDelete, setDisableDelete] = useState(true)
  const [cachedPost, setCachedPost] = useState()
  const [disable, setDisable] = useState(true)
  const [delPost, setDelPost] = useState({})
  const [formatDate, setFormatDate] = useState()
  //tags
  const [tags, setTags] = useState()
  const [selectionTag, setSelectionTag] = useState()
  useEffect(() => {
    async function FetchPost() {
      try {
      const result = await axiosClient.get('/posts')
      result.data.map((post) => {
        return {
          ...result,
          created_at: format(new Date(post.created_at), 'MMM dd, yyyy'),
          updated_at: format(new Date(post.updated_at), 'MMM dd, yyyy')
        }
      })
      setListPost(result.data)
      setCachedPost(result.data)
      setFormatDate(result.data.map((post) => formatDistanceToNow(new Date(post.created_at))))
      }
      catch (error) {
        console.log(error)
      }
    }
    FetchPost()
  }, [])
  useEffect(() => {
    async function FetchTags() {
      const result = await axiosClient.get('/tags')
      setTags(result.data)
    }
    FetchTags()
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
      field: 'created_at',
      headerName: 'Create_at',
      width: 150,
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
  const columnTags = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'Name', headerName: 'Name', width: 400 },
    {
      field: 'Status',
      headerName: 'Status',
      width: 120,
    },
    {
      field: 'created_at',
      headerName: 'Create_at',
      width: 200,
    },
    {
      field: 'updated_at',
      headerName: 'Updated_at',
      width: 200,
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
    let id = delPost[0].id
    await axiosClient.delete(`/posts/${id}`)
    setDisable(true)
    setDisableDelete(true)
  }
  const handleChangeStatusTag = async () => {
    try {
      let tagId = selectionTag[0]
      const result = await axiosClient.put(`/tags/${tagId}`, {
        Status: TAG_STATUS.PUBLISH,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeStatusTagUnpublish = async () => {
    try {
      let tagId = selectionTag[0]
      const result = await axiosClient.put(`/tags/${tagId}`, {
        Status: TAG_STATUS.UNPUBLISH,
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteTag = async () => {
    let tagId = selectionTag[0]
    await axiosClient.delete(`/tags/${tagId}`)
  }
  return (
    <Grid container spacing={3}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <div>
          <div style={{ height: 400, marginTop: 30 }}>
            <Typography variant="h3">Post</Typography>
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickUndo}
                disabled={disable}
              >
                {BUTTON_POST.Undo.label}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickSave}
                disabled={disable}
              >
                {BUTTON_POST.Save.label}
              </Button>
            </CardActions>
          </div>
          <div style={{ height: 400, marginTop: 140 }}>
            <Typography variant="h3">Tags</Typography>
            <DataGrid
              rows={tags}
              columns={columnTags}
              disableSelectionOnClick
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(ids) => {
                setSelectionTag(ids)
              }}
            />
            <CardActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangeStatusTag}
                variant="outlined"
              >
                {TAG_STATUS.PUBLISH}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleChangeStatusTagUnpublish}
                variant="outlined"
              >
                {TAG_STATUS.UNPUBLISH}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteTag}
                variant="outlined"
              >
                {TAG_STATUS.DELETE.label}
              </Button>
            </CardActions>
          </div>
        </div>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  )
}
export default ListPost

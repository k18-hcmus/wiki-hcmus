import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Card,
  Button,
  Popover,
} from '@mui/material'
import { styled } from '@mui/styles'

import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import axios from 'axios'
import axiosClient from '../../../axiosClient'
import { showErrMsg, showSuccessMsg } from '../../../utils/Notifications'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { POST_STATUS } from '../../../shared/constants'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})
import { useSelector } from 'react-redux'
import { getAccUser } from '../../../redux/slices/userSlice'
import { date } from 'faker'
import { NORTIFICATION_CONST } from '../../../shared/constants'
import { addNortification } from '../../../utils/nortification-utils'
const FormBox = styled(Box)({
  borderRadius: 3,
  boxShadow: '#091e42 0px 1px 1px 0px',
  color: '#172b4d',
  padding: '20px 16px',
  marginTop: '15px',
  lineHeight: '20px',
  fontSize: '14px',
})
const CardContentText = styled(Typography)({
  color: '#1c1c1c',
  fontSize: '14px',
  fontWeight: 500,
})
export async function getStaticProps() {
  const res = await fetch(`${process.env.STRAPI_API_URL}tags`)
  const Tags = await res.json()
  return {
    props: {
      Tags,
    },
  }
}

function Announce() {
  const [disabled, setDisabled] = useState(true)
  const [msg, setMsg] = useState({ err: '', success: '' }) //message

  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [ArrIdUser, setArrIdUser] = useState()
  useEffect(() => {
    async function FetchUserId() {
      try {
        const response = await axiosClient.get('/account-users')
        setArrIdUser(response.data.map((user) => user.id))
      } catch (error) {
        console.log(error)
      }
    }
    FetchUserId()
  }, [])
  const [ownUserData, setOwnUserData] = useState({
    id: null,
    DisplayName: '',
  })
  const userDataObject = useSelector(getAccUser)
  useEffect(() => {
    if (userDataObject && Object.keys(userDataObject).length !== 0) {
      setOwnUserData(userDataObject)
    }
  }, [userDataObject])

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const body = JSON.stringify(content)
    try {
      const response = await axiosClient.post('posts', {
        Title: title,
        Content: body,
        Status: POST_STATUS.Publish.value,
        User: ownUserData,
      })
      const textContent = `Admin ${ownUserData.DisplayName} created notification ${response.data.Title}`
      for (let i = 0; i < ArrIdUser.length; i++) {
        addNortification(
          NORTIFICATION_CONST.TYPE.ADMIN,
          ArrIdUser[i],
          response.data.id,
          textContent
        )
      }
      response && setMsg({ err: '', success: 'Create announce succeed' })
    } catch (error) {
      setMsg({ err: error.message, success: '' })
    }
    setDisabled(true)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
    !event.target.value ? setDisabled(true) : setDisabled(false)
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    setContent(convertToRaw(editorState.getCurrentContent()))
  }
  const uploadImageCallBack = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'wiki-hcmus')
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formData)
      return Promise.resolve({
        data: {
          link: `${response.data.secure_url}`,
        },
      })
    } catch (e) {
      console.log('caught error')
      console.error(e)
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container direction="row" alignContent="center" justifyContent="center" spacing="30">
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={{ mt: 8 }} direction="column">
            <Typography variant="h5">CREATE ANNOUNCE</Typography>
            <Divider />
            {msg.err && showErrMsg(msg.err)}
            {msg.success && showSuccessMsg(msg.success)}
            <FormBox component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                label="Title"
                onChange={handleTitleChange}
              />
              <Card sx={{ height: 450 }}>
                <Editor
                  editorState={editorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  onEditorStateChange={onEditorStateChange}
                  // toolbarOnFocus
                  toolbar={{
                    options: [
                      'inline',
                      'blockType',
                      'fontSize',
                      'fontFamily',
                      'list',
                      'textAlign',
                      'image',
                      'emoji',
                      'colorPicker',
                      'link',
                      'history',
                    ],
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                      urlEnabled: true,
                      uploadEnabled: true,
                      uploadCallback: uploadImageCallBack,
                      previewImage: true,
                      alt: { present: false, mandatory: false },
                    },
                  }}
                />
              </Card>
              <Grid container sx={{ mt: 2, mb: 2 }} direction="row" spacing={1}>
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Box
                    sx={{
                      width: 300,
                      height: 250,
                    }}
                  ></Box>
                </Popover>
              </Grid>
              <Divider />
              <Grid container direction="row" justifyContent="space-between" alignContent="center">
                <Grid item />
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={disabled}
                  >
                    SEND
                  </Button>
                </Grid>
              </Grid>
            </FormBox>
          </Box>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Container>
  )
}

export default Announce

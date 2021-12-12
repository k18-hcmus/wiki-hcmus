import React, { useState } from 'react'
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  CardHeader,
  Avatar,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Autocomplete,
  Popover,
} from '@mui/material'
import { styled } from '@mui/styles'
import faker from 'faker'
import TagCard from '../../components/CreatePost/TagCard'
import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import axios from 'axios'
import axiosClient from '../../axiosClient'
import { showErrMsg, showSuccessMsg } from '../../utils/Notifications'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { POST_STATUS } from '../../utils/constants'
import TagSearch from '../../components/CreatePost/TagSearch'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import AddIcon from '@mui/icons-material/Add'
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
})

let Rules = [
  {
    id: 1,
    detail: 'Remember the human',
  },
  {
    id: 2,
    detail: 'Behave like you would in real life',
  },
  {
    id: 3,
    detail: 'Look for the original source of content',
  },
  {
    id: 4,
    detail: 'Search for duplicates before posting',
  },
  {
    id: 5,
    detail: 'Read the community’s rule',
  },
]
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
const CreatePost = ({ Tags }) => {
  const [disabled, setDisabled] = useState(true)
  const [msg, setMsg] = useState({ err: '', success: '' }) //message
  const [showTagDetail, setShowTagDetail] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [tagArr, setTagArr] = useState([])
  const handleTagArr = (tags) => {
    setTagArr(tags)
  }
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const body = JSON.stringify(content)
    try {
      const response = axiosClient.post('posts', {
        Title: title,
        Content: body,
        Tags: tagArr,
        Status: POST_STATUS.PUBLISH, // Waiting approve post function
      })
      response && setMsg({ err: '', success: 'Create post succeed' })
    } catch (error) {
      setMsg({ err: error.message, success: '' })
    }
    setDisabled(true)
  }
  const handleClickTag = (event) => {
    const getTag = Tags.filter((tag) => tag.id.toString() === event.currentTarget.id)
    setShowTagDetail(true)
    setSelectedTag(getTag)
  }
  const handleDeleteTag = (tagToDelete) => () => {
    setTagArr((tags) => tags.filter((tag) => tag.id !== tagToDelete))
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
      const respone = await axios.post(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, formData)
      return Promise.resolve({
        data: {
          link: `${respone.data.secure_url}`,
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
        <Grid item xs={8}>
          <Box sx={{ mt: 8 }} direction="column">
            <Typography variant="h5">Create a post</Typography>
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
                {tagArr &&
                  tagArr.map((tags) => (
                    <Grid item key={tags.id}>
                      <Chip
                        key={tags.id}
                        id={tags.id}
                        label={tags.Name}
                        variant="outlined"
                        onClick={handleClickTag}
                        onDelete={handleDeleteTag(tags.id)}
                      />
                    </Grid>
                  ))}
                <Grid item>
                  <Chip
                    icon={<AddIcon />}
                    label="Add tag"
                    variant="outlined"
                    onClick={handlePopoverClick}
                  />
                </Grid>
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
                  >
                    <TagSearch
                      Tags={Tags} // All tags data
                      TagsArr={tagArr} // Tag array added
                      handleTag={handleTagArr}
                    />
                  </Box>
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
                    POST
                  </Button>
                </Grid>
              </Grid>
            </FormBox>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ mt: 8 }} direction="column">
            {showTagDetail && <TagCard tag={selectedTag} />}
            <Card>
              <CardHeader
                avatar={<Avatar src="/static/icons/ruleIcon.png" />}
                title="Rules create a post"
              />
              {Rules.map((rule) => (
                <CardContent sx={{ mt: -2 }} key={rule.id}>
                  <CardContentText>
                    {rule.id}. {rule.detail}
                  </CardContentText>
                  <Divider />
                </CardContent>
              ))}
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default CreatePost

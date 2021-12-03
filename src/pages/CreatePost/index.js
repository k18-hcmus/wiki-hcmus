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
} from '@mui/material'
import { styled } from '@mui/styles'
import { EditorState } from 'draft-js'
import dynamic from 'next/dynamic'
import apiClient from '../api/api-Client'
import { convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { fontWeight } from '@mui/system'
import faker from 'faker'
import TagCard from './TagCard'
let TagData = [
  {
    id: 1,
    name: 'Mon Hinh Hoa',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo nulla, dignissim sed diam imperdiet, placerat ullamcorper mi. Donec euismod, urna id tincidunt luctus, neque nibh congue arcu, quis efficitur justo ipsum sit amet nisi. Aliquam enim turpis, fermentum ac pretium sed, eleifend quis est. Vestibulum ultricies sed mi ut gravida. Vivamus aliquet enim eu diam accumsan rhoncus. Mauris consectetur magna et mattis sagittis.',
    posts: faker.datatype.number(),
    votes: faker.datatype.number(),
    iconTag: '/static/avatars/avatar_1.jpg',
    createdAt: faker.date.past(),
  },
  {
    id: 2,
    name: 'Truong Toan Thinh',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo nulla, dignissim sed diam imperdiet, placerat ullamcorper mi. Donec euismod, urna id tincidunt luctus, neque nibh congue arcu, quis efficitur justo ipsum sit amet nisi. Aliquam enim turpis, fermentum ac pretium sed, eleifend quis est. Vestibulum ultricies sed mi ut gravida. Vivamus aliquet enim eu diam accumsan rhoncus. Mauris consectetur magna et mattis sagittis.',
    posts: faker.datatype.number(),
    votes: faker.datatype.number(),
    iconTag: '/static/avatars/avatar_1.jpg',
    createdAt: faker.date.past(),
  },
  {
    id: 3,
    name: 'Qua mon cap toc',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam leo nulla, dignissim sed diam imperdiet, placerat ullamcorper mi. Donec euismod, urna id tincidunt luctus, neque nibh congue arcu, quis efficitur justo ipsum sit amet nisi. Aliquam enim turpis, fermentum ac pretium sed, eleifend quis est. Vestibulum ultricies sed mi ut gravida. Vivamus aliquet enim eu diam accumsan rhoncus. Mauris consectetur magna et mattis sagittis.',
    posts: faker.datatype.number(),
    votes: faker.datatype.number(),
    iconTag: '/static/avatars/avatar_1.jpg',
    createdAt: faker.date.past(),
  },
]
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
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
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
const CreatePost = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [disabled, setDisabled] = useState(true)
  const [category, setCategory] = useState('')
  const [showTagDetail, setShowTagDetail] = useState(false)
  const [selectedTag, setSelectedTag] = useState(null)
  const handleSubmit = (event) => {
    event.preventDefault()
    setDisabled(true)
  }
  const handleSelect = (event) => {
    event.preventDefault()
    setDisabled(false)
    setCategory(event.target.value)
  }
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }
  const uploadImageCallBack = async (file) => {
    const imgData = await apiClient.uploadInlineImageForArticle(file)
    return Promise.resolve({
      data: {
        link: `${process.env.NEXT_PUBLIC_API_URL}${imgData[0].formats.small.url}`,
      },
    })
  }
  const handleClickTag = (event) => {
    const getTag = TagData.filter(
      (tag) => tag.id.toString() === event.currentTarget.id
    )
    setShowTagDetail(true)
    setSelectedTag(getTag)
  }
  const handleDeleteTag = () => {
    console.log('Deleted tag')
  }
  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        alignContent="center"
        justifyContent="center"
        spacing="30"
      >
        <Grid item xs={8}>
          <Box sx={{ mt: 8 }} direction="column">
            <Typography variant="h5">Create a post</Typography>
            <Divider />
            <FormControl size="small" sx={{ mt: 3, minWidth: 250 }}>
              <InputLabel>Category</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleSelect}
              >
                <MenuItem value={'Subject'}>Mon hoc</MenuItem>
                <MenuItem value={'Teacher'}>Giao Vien</MenuItem>
                <MenuItem value={'Tips'}>Tip and trick</MenuItem>
              </Select>
            </FormControl>
            <FormBox component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                label="Title"
              />
              <Card sx={{ height: 250 }}>
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
              <Stack sx={{ mt: 2, mb: 2 }} direction="row" spacing={1}>
                {TagData.map((tags) => (
                  <Chip
                    key={tags.id}
                    id={tags.id}
                    label={tags.name}
                    variant="outlined"
                    onClick={handleClickTag}
                    onDelete={handleDeleteTag}
                  />
                ))}
              </Stack>
              <Divider />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignContent="center"
              >
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

import { useState, useEffect } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
//import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import axiosClient from '../../axiosClient'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import { TAG_COLOR, CATEGORY_CONST, MAJOR_CONST, TAG_STATUS } from '../../shared/constants'
import { showErrMsg, showSuccessMsg } from '../../utils/Notifications'
import { fetchTags, getTags } from '../../redux/slices/tagSlice'
import { checkAdmin } from '../../utils/validation'
import AuthRoute from '../../utils/ProtectedRoute'
const colorObj = {
  default: false,
  red: false,
  blue: false,
  green: false,
  yellow: false,
}
let colorTagSelected = TAG_COLOR.DEFAULT // Tag color defualt
let categorySelected = CATEGORY_CONST.TEACHER // Category defualt
const CreateTag = () => {
  const router = useRouter()
  const tags = useSelector(getTags)
  const user = useSelector(getUser)
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(true)
  const [msg, setMsg] = useState({ err: '', success: '' })
  const [category, setCategory] = useState(CATEGORY_CONST.TEACHER.id) //defualt category is subject
  const [major, setMajor] = useState(MAJOR_CONST[0].id) //defualt major is CNTT
  const [nameTag, setNameTag] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const [colorTag, setColorTag] = useState({
    default: true,
    red: false,
    blue: false,
    green: false,
    yellow: false,
  })
  const handleChangeTagName = (event) => {
    setNameTag(event.target.value)
    !event.target.value ? setDisabled(true) : setDisabled(false)
  }
  const handleChangeCategory = (event) => {
    setCategory(event.target.value)
    categorySelected = Object.keys(CATEGORY_CONST)
      .map((key) => CATEGORY_CONST[key])
      .find((cate) => cate.id == event.target.value)
  }
  const handleChangeMajor = (event) => {
    setMajor(event.target.value)
  }
  const handleChangeColor = (event) => {
    const colorNameSelected = event.target.name
    colorTagSelected = Object.keys(TAG_COLOR)
      .map((key) => TAG_COLOR[key])
      .find((colorTag) => colorTag.name == colorNameSelected)
    setColorTag({ ...colorObj, [colorNameSelected]: true })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData(event.currentTarget)
    let status = TAG_STATUS.UNPUBLISH
    if (checkAdmin(user)) {
      // if Admin will publish tag
      status = TAG_STATUS.PUBLISH
    }
    const checkedNameTag = tags.find((tag) => tag.Name == nameTag)
    if (checkedNameTag) {
      // Check name tag already exist
      setNameErr(true)
      setMsg({ err: 'Name tag already exist', success: '' })
      setLoading(false)
      return
    }
    try {
      const response = await axiosClient.post('/tags', {
        Name: nameTag,
        Description: data.get('TagContent'),
        AvatarURL: categorySelected.photoURL,
        ColorTag: colorTagSelected.color,
        Category: category,
        Majors: major,
        Status: status,
      })
      if (status == TAG_STATUS.PUBLISH) {
        // Update tags state
        dispatch(fetchTags())
      }
      setMsg({ err: '', success: 'Create tag success' })
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const showAvatarTag = () => {
    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Avatar
              src={categorySelected.photoURL}
              sx={{
                height: 65,
                mb: 2,
                width: 65,
              }}
            />
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container spacing={2} justifyContent={'flex-start'}>
            <Grid item>
              <Typography>Preview</Typography>
            </Grid>
            <Grid item>
              <Chip
                icon={<Avatar sx={{ width: 25, height: 25 }} src={categorySelected.photoURL} />}
                label={nameTag}
                sx={{ color: '#FFFFFF', backgroundColor: colorTagSelected.color }}
              />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    )
  }
  const showDetailTag = () => {
    return (
      <Card>
        <CardHeader subheader="The information can be edited" title="Tag Detail" />
        <Divider />
        <CardContent>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                onChange={handleChangeTagName}
                required
                fullWidth
                error={nameErr}
                id="NameTag"
                label="NameTag"
                name="NameTag"
                autoFocus
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                rows={5}
                name="TagContent"
                label="Tag Description"
                id="TagContent"
              />
            </Grid>
            <Grid item>
              <Typography>Color Tag:</Typography>
              {Object.keys(TAG_COLOR).map((key, index) => (
                <Checkbox
                  sx={{
                    color: TAG_COLOR[key].color,
                    '&.Mui-checked': {
                      color: TAG_COLOR[key].color,
                    },
                  }}
                  key={index}
                  name={TAG_COLOR[key].name}
                  checked={colorTag[TAG_COLOR[key].name]}
                  onChange={handleChangeColor}
                />
              ))}
            </Grid>
            <Grid item>
              <Typography sx={{ mb: 2 }}>Select Category:</Typography>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={category} label="Category" onChange={handleChangeCategory}>
                  <MenuItem value={1}>Teacher</MenuItem>
                  <MenuItem value={2}>Subject</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography sx={{ mb: 2 }}>Select Major:</Typography>
              <FormControl fullWidth>
                <InputLabel>Major</InputLabel>
                <Select value={major} label="Category" onChange={handleChangeMajor}>
                  <MenuItem value={1}>{MAJOR_CONST[0].name}</MenuItem>
                  <MenuItem value={2}>{MAJOR_CONST[1].name}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{ mr: 2 }}
            onClick={() => {
              router.back()
            }}
          >
            Back
          </Button>
          <LoadingButton
            disabled={disabled}
            color="secondary"
            loading={loading}
            variant="contained"
            type="submit"
          >
            Create tag
          </LoadingButton>
        </Box>
      </Card>
    )
  }
  return (
    <AuthRoute>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        component="form"
        onSubmit={handleSubmit}
        noValidate
      >
        <Grid
          container
          spacing="10"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item xs={6} md={2}>
            {showAvatarTag()}
          </Grid>
          <Grid item xs={6} md={6}>
            {msg.success && showSuccessMsg(msg.success)}
            {msg.err && showErrMsg(msg.err)}
            {showDetailTag()}
          </Grid>
        </Grid>
      </Box>
    </AuthRoute>
  )
}
export default CreateTag

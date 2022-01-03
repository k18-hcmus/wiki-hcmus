import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  TableContainer,
  TextField,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Link,
} from '@mui/material'
import { SeverityPill } from './severity-pill'
import { STATUS_POST, DASHBOARD_CONST } from '../../../shared/constants'

const LatestPosts = ({ data }) => {
  const options = DASHBOARD_CONST.LIMIT_VIEW
  const [option, setOption] = useState(options[0])
  const [totalPostData, setTotalPostData] = useState([])
  const [postData, setPostData] = useState([])
  const [sortDateDirection, setSortDateDirection] = useState('asc')
  const sortPostByDate = (type, data) => {
    let tempPostData = data.slice()
    switch (type) {
      case 'asc':
        tempPostData = tempPostData.sort((a, b) => {
          const dateA = new Date(a.updated_at)
          const dateB = new Date(b.updated_at)
          return dateA.getTime() > dateB.getTime() ? -1 : 1
        })
        break
      case 'desc':
        tempPostData = tempPostData.sort((a, b) => {
          const dateA = new Date(a.updated_at)
          const dateB = new Date(b.updated_at)
          return dateA.getTime() < dateB.getTime() ? -1 : 1
        })
        break
    }
    return tempPostData
  }
  const handleSortDate = () => {
    setPostData(sortPostByDate(sortDateDirection === 'asc' ? 'desc' : 'asc', postData))
    setSortDateDirection(sortDateDirection === 'asc' ? 'desc' : 'asc')
  }
  const handleLimitPostViewChange = (evt) => {
    setOption(evt.target.value)
  }
  const filterPostData = (option, totalData) => {
    if (totalData.length === 0) return
    if (option === DASHBOARD_CONST.LIMIT_VIEW[DASHBOARD_CONST.LIMIT_VIEW.length - 1]) {
      setPostData(totalData.slice())
    } else {
      setPostData(totalData.slice(0, option))
    }
  }
  const handleSearch = (evt) => {
    if (totalPostData.length === 0) return
    if (evt.target.value === '') filterPostData(option, totalPostData)
    else {
      const searchData = totalPostData.filter((post) =>
        post.Title.toLowerCase().includes(evt.target.value.toLowerCase())
      )
      filterPostData(option, searchData)
    }
  }
  useEffect(() => {
    filterPostData(option, totalPostData)
  }, [option])
  useEffect(() => {
    filterPostData(option, totalPostData)
  }, [totalPostData])
  useEffect(() => {
    setTotalPostData(sortPostByDate('asc', data))
  }, [data])
  return (
    <Card>
      <CardHeader
        title="Posts"
        action={
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                label={DASHBOARD_CONST.POSTS.SEARCH}
                variant="outlined"
                onChange={handleSearch}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="posts-option-select-label">Limit</InputLabel>
                <Select
                  labelId="posts-option-select-label"
                  id="posts-option-select"
                  value={option}
                  defaultValue=""
                  label="Limit"
                  onChange={handleLimitPostViewChange}
                  autoWidth
                >
                  {options.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value === 'None' ? 'None' : value + ' Posts'}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      />
      <TableContainer style={{ maxHeight: 512, minHeight: 360 }}>
        <Table stickyHeader>
          <colgroup>
            <col style={{ width: '20%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '50%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction={sortDateDirection} onClick={handleSortDate}>
                    {DASHBOARD_CONST.POSTS.UPDATED_DATE}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>{DASHBOARD_CONST.POSTS.STATUS}</TableCell>
              <TableCell>{DASHBOARD_CONST.POSTS.VIEWS}</TableCell>
              <TableCell>{DASHBOARD_CONST.POSTS.VOTES}</TableCell>
              <TableCell>{DASHBOARD_CONST.POSTS.TITLE}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postData.map((post, index) => (
              <TableRow key={index} hover>
                <TableCell>{formatDistanceToNow(new Date(post.updated_at))}</TableCell>
                <TableCell>
                  <SeverityPill
                    color={
                      (post.Status === STATUS_POST.Publish.value && 'success') ||
                      (post.Status === STATUS_POST.Refused.value && 'error') ||
                      'warning'
                    }
                  >
                    {post.Status}
                  </SeverityPill>
                </TableCell>
                <TableCell>{post.ViewCount}</TableCell>
                <TableCell>{post.UpvoteCount + post.DownvoteCount}</TableCell>
                <Link href={`/posts/${post.id}`} underline="hover">
                  <TableCell>{post.Title}</TableCell>
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default LatestPosts

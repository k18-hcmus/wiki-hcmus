import React, { useEffect, useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import {
  Card,
  CardHeader,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from '@mui/material'
import { DASHBOARD_CONST } from '../../../shared/constants'

const LatestComments = ({ data }) => {
  const options = DASHBOARD_CONST.LIMIT_VIEW
  const orders = ['asc', 'desc']
  const [order, setOrder] = useState(orders[0])
  const [option, setOption] = useState(options[0])
  const [totalCommentData, setTotalCommentData] = useState([])
  const [commentData, setCommentData] = useState([])
  const sortCommentByDate = (type, data) => {
    let tempCommentData = data.slice()
    switch (type) {
      case 'asc':
        tempCommentData = tempCommentData.sort((a, b) => {
          const dateA = new Date(a.updated_at)
          const dateB = new Date(b.updated_at)
          return dateA.getTime() > dateB.getTime() ? -1 : 1
        })
        break
      case 'desc':
        tempCommentData = tempCommentData.sort((a, b) => {
          const dateA = new Date(a.updated_at)
          const dateB = new Date(b.updated_at)
          return dateA.getTime() < dateB.getTime() ? -1 : 1
        })
        break
    }
    return tempCommentData
  }
  const handleCommentOrderChange = (evt) => {
    setOrder(evt.target.value)
  }
  useEffect(() => {
    setCommentData(sortCommentByDate(order, commentData))
  }, [order])
  const handleLimitCommentViewChange = (evt) => {
    setOption(evt.target.value)
  }
  const filterCommentData = (option, totalData) => {
    if (totalCommentData.length === 0) return
    if (option === DASHBOARD_CONST.LIMIT_VIEW[DASHBOARD_CONST.LIMIT_VIEW.length - 1]) {
      setCommentData(totalData.slice())
    } else {
      setCommentData(totalData.slice(0, option))
    }
  }
  const handleSearch = (evt) => {
    if (totalCommentData.length === 0) return
    if (evt.target.value === '') filterCommentData(option, totalCommentData)
    else {
      const searchData = totalCommentData.filter((comment) =>
        comment.Content.toLowerCase().includes(evt.target.value.toLowerCase())
      )
      filterCommentData(option, searchData)
    }
  }
  useEffect(() => {
    filterCommentData(option, totalCommentData)
  }, [option])
  useEffect(() => {
    filterCommentData(option, totalCommentData)
  }, [totalCommentData])
  useEffect(() => {
    setTotalCommentData(sortCommentByDate('asc', data))
  }, [data])
  return (
    <Card>
      <CardHeader
        title="Comments"
        action={
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                label={DASHBOARD_CONST.COMMENTS.SEARCH}
                variant="outlined"
                onChange={handleSearch}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="comments-order-select-label">Order</InputLabel>
                <Select
                  labelId="comments-order-select-label"
                  id="comments-order-select"
                  value={order}
                  defaultValue=""
                  label="Order"
                  onChange={handleCommentOrderChange}
                  autoWidth
                >
                  {orders.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="comments-option-select-label">Limit</InputLabel>
                <Select
                  labelId="comments-option-select-label"
                  id="comments-option-select"
                  value={option}
                  defaultValue=""
                  label="Limit"
                  onChange={handleLimitCommentViewChange}
                  autoWidth
                >
                  {options.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value}>
                        {value === 'None' ? 'None' : value + ' Comments'}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      />
      <Divider />
      <Paper style={{ maxHeight: 428, minHeight: 256, overflow: 'auto' }}>
        <List>
          {commentData.map((record, i) => (
            <Link
              href={record.Post ? `/posts/${record.Post.id}` : '/'}
              underline="none"
              key={record.id}
              //Needs testing after complete post detail
            >
              <ListItem divider={i < commentData.length - 1}>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="text.primary">
                      {record.Content}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {`${DASHBOARD_CONST.COMMENTS.UPDATED} ${formatDistanceToNow(
                        Date.parse(record.updated_at)
                      )}`}
                    </Typography>
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Card>
  )
}

export default LatestComments

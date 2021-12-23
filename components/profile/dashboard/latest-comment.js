import { formatDistanceToNow } from 'date-fns'
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const LatestComments = (props) => {
  const showDataNum = 5
  const { data } = props
  const showData = data.slice(0, showDataNum)
  return (
    <Card {...props}>
      <CardHeader subtitle={`${data.length} in total`} title="Latest Comments" />
      <Divider />
      <List>
        {showData.map((record, i) => (
          <ListItem divider={i < showData.length - 1} key={record.id}>
            <ListItemText
              primary={record.Content}
              secondary={`Updated ${formatDistanceToNow(Date.parse(record.updated_at))}`}
            />
            <IconButton edge="end" size="small">
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
          View all
        </Button>
      </Box>
    </Card>
  )
}

export default LatestComments

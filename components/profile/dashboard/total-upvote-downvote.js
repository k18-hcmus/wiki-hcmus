import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'

const TotalUpvoteDownvote = (props) => {
  const { totalUpvote, totalDownvote } = props
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              UPVOTES
            </Typography>
            <Typography color="success.main" variant="h4">
              {totalUpvote}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                mt: 2,
                backgroundColor: 'success.main',
                height: 56,
                width: 56,
              }}
            >
              <KeyboardDoubleArrowUpIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              DOWNVOTES
            </Typography>
            <Typography color="error.main" variant="h4">
              {totalDownvote}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                mt: 2,
                backgroundColor: 'error.main',
                height: 56,
                width: 56,
              }}
            >
              <KeyboardDoubleArrowDownIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default TotalUpvoteDownvote

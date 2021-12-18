import { formatDistanceToNow } from 'date-fns'
import { Grid, Button, ListItem, Avatar, Typography, styled } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const MoreButton = styled(Button)({
  position: 'absolute',
  right: '15px',
})

const CenteredTextGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
})

const HistoryCell = (props) => {
  const { data } = props
  return (
    <ListItem sx={{ px: 4 }}>
      <Grid container spacing={1}>
        <Grid item lg={8} md={8} xl={8} xs={6}>
          <Grid container spacing={1}>
            <Grid item auto>
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                }}
              >
                <img src="https://via.placeholder.com/100" />
              </Avatar>
            </Grid>
            <CenteredTextGrid item lg={10} md={10} xl={10} xs={9}>
              <Typography variant="caption">{data.actor}</Typography>
            </CenteredTextGrid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <Typography variant="body2">{data.action}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} xl={4} xs={6}>
          <Grid container spacing={1}>
            <CenteredTextGrid item lg={12} md={12} xl={12} xs={12}>
              <Typography align="right" color="textSecondary" variant="caption">
                {formatDistanceToNow(new Date(data.created_at))}
              </Typography>
            </CenteredTextGrid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <MoreButton>
                <MoreVertIcon />
              </MoreButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default HistoryCell

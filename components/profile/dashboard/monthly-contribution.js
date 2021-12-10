import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChangeArrow from '../commons/change-arrow';

const MonthlyContribution = (props) => {
  const {cPLastMonth, cPThisMonth} = props;
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              MONTHLY CONTRIBUTION 
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {cPThisMonth} Pts
            </Typography>
          </Grid>
          {/* <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'info.main',
                height: 56,
                width: 56
              }}
            >
              <CalendarTodayIcon />
            </Avatar>
          </Grid> */}
        </Grid>
        <ChangeArrow
          currentValue={cPThisMonth}
          lastestValue={cPLastMonth}
          context='Since Last Month'
        />
      </CardContent>
    </Card>
  );
}

export default MonthlyContribution;
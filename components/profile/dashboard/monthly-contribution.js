import { Card, CardContent, Grid, Typography } from '@mui/material'
import ChangeArrow from '../commons/change-arrow'

const MonthlyContribution = (props) => {
  const { cPLastMonth, cPThisMonth } = props
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              MONTHLY CONTRIBUTION
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {cPThisMonth} Pts
            </Typography>
          </Grid>
        </Grid>
        <ChangeArrow
          currentValue={cPThisMonth}
          lastestValue={cPLastMonth}
          context="Since Last Month"
        />
      </CardContent>
    </Card>
  )
}

export default MonthlyContribution

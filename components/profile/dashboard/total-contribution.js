import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { CONTRIBUTION_CONST } from '../../../shared/constants';

const TotalContribution = (props) => {
  const {totalCP} = props;
  var currentTier = 'Untiered';
  var nextTierCP = 0;
  for (const tierName in CONTRIBUTION_CONST.TIER) {
    if (totalCP < CONTRIBUTION_CONST.TIER[tierName]) {
      nextTierCP = CONTRIBUTION_CONST.TIER[tierName];
      break;
    }
    else
      currentTier = tierName;
  }
  return (
    <Card {...props}>
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
              TOTAL CONTRIBUTION
            </Typography>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {totalCP} Pts
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >
              {currentTier} Tier
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <Typography
              color="textSecondary"
              variant="caption"
            >
              {Math.trunc(totalCP * 100 / nextTierCP)}% Until Next Tier
          </Typography>
          <LinearProgress
            value={totalCP * 100 / nextTierCP}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default TotalContribution;
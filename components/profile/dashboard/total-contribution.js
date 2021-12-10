import { 
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import levelSystem from '../../data/level-system';

const TotalContribution = (props) => {
  const {totalCP} = props;
  var currentTier = 'Untiered';
  var nextTierCP = 0;
  for (const tierName in levelSystem.tier) {
    if (totalCP < levelSystem.tier[tierName]) {
      nextTierCP = levelSystem.tier[tierName];
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
          {/* <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <ControlPointIcon />
            </Avatar>
          </Grid> */}
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
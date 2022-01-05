import React from 'react'
import { Chart, LineAdvance } from 'bizcharts'
import { Box, Typography, Grid } from '@mui/material'

const Views = ({ data }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Grid container>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={data}>
            <LineAdvance shape="smooth" point area position="date*value" color="type" />
          </Chart>
        </Grid>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <Typography color="text.secondary" variant="body2" textAlign="center">
            Clicks on data label to turn on/off that data display on the chart
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Views

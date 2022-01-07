import React from 'react'
import { Card, CardContent, Typography, CardHeader, Grid, Avatar } from '@mui/material'
import { COLOR_SET } from '../../shared/constants'
import { HOME_DETAIL } from '../../shared/home-constants'
import AbstractTag from '../commons/abstract-tag'

const SidebarHome = ({ tagData }) => {
  const DETAIL_CONST = HOME_DETAIL.SIDEBAR_DETAIL
  return (
    <>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={<Typography variant="body1">{DETAIL_CONST.ABOUT.TITLE}</Typography>}
        />
        <CardContent>
          <Grid container direction={'row'} justifyContent={'flex-start'} alignContent={'center'}>
            <Grid item>
              <Avatar
                variant="square"
                sx={{ width: 50, height: 50 }}
                src={'/static/illustrations/robot.png'}
              />
            </Grid>
            <Grid item>
              <Typography color="text.primary" variant="body2" sx={{ mb: 2 }}>
                {DETAIL_CONST.ABOUT.WELLCOME}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="subtitle1" sx={{ mt: 1, mb: 2 }}>
            {DETAIL_CONST.ABOUT.BODY}
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {DETAIL_CONST.EXTRA_TITLE}
          </Typography>
        </CardContent>
      </Card>
      {tagData.map((tag, index) => (
        <AbstractTag key={index} data={tag} />
      ))}
    </>
  )
}
export default SidebarHome

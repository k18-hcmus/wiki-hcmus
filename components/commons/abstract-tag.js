import React from 'react'
import { Card, CardContent, Typography, CardHeader, Box, Grid, Link } from '@mui/material'
import { TAG_DETAIL, COLOR_SET } from '../../shared/constants'

const AbstractTag = ({ data, isDetailPage }) => {
  const DETAIL_CONST = TAG_DETAIL.SIDEBAR_DETAIL
  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        sx={{ backgroundColor: data.color || COLOR_SET.BLUE }}
        title={
          isDetailPage ? (
            <Typography variant="body1" sx={{color: 'white'}}>{DETAIL_CONST.ABOUT.TITLE}</Typography>
          ) : (
            <Link href={`/tags/${data.id}`} underline="hover">
              <Typography variant="body1" sx={{color: 'white'}}>{data.name}</Typography>
            </Link>
          )
        }
      />
      <CardContent>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          {data.description}
        </Typography>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="body1" color="text.secondary" display="block" textAlign="left">
              {data.postNum}
            </Typography>
            <Typography variant="body2" color="text.primary" display="block" textAlign="left">
              {DETAIL_CONST.ABOUT.POST}
            </Typography>
          </Grid>

          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Typography variant="body1" color="text.secondary" display="block" textAlign="left">
              {data.voteNum}
            </Typography>
            <Typography variant="body2" color="text.primary" display="block" textAlign="left">
              {DETAIL_CONST.ABOUT.VOTE}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="body2" color="text.primary" display="inline" textAlign="left">
              {DETAIL_CONST.ABOUT.CREATED_AT}&nbsp;&nbsp;
            </Typography>
            <Typography variant="body2" color="text.secondary" display="inline" textAlign="left">
              {data.createdDate}
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <Typography variant="body2" color="text.primary" display="inline" textAlign="left">
              {DETAIL_CONST.ABOUT.MAJOR}&nbsp;&nbsp;
            </Typography>
            {data.majors && (
              <Box display="flex" flexDirection="row">
                {data.majors.map((major, index) =>
                  index !== data.majors.length - 1 ? (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      display="inline"
                      textAlign="left"
                    >
                      {major.Name},&nbsp;
                    </Typography>
                  ) : (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      display="inline"
                      textAlign="left"
                    >
                      {major.Name}
                    </Typography>
                  )
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AbstractTag

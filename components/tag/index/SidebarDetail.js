import React, { useState, useEffect } from 'react'
import axiosClient from '../../../axiosClient'
import { useRouter } from 'next/router'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  styled,
  Button,
  Grid,
  List,
} from '@mui/material'
import { TAG_DETAIL, COLOR_SET } from '../../../shared/constants'
import RelatedTagCell from '../related-tag/RelatedTagCell'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const SidebarDetail = ({ data }) => {
  const [viewExpand, setViewExpand] = useState(false)
  const DETAIL_CONST = TAG_DETAIL.SIDEBAR_DETAIL
  const isOverflowTag = data.relatedTags.length > DETAIL_CONST.RELATED_TAG.OVERFLOW_NUM
  const handleExpandRelatedTag = () => {
    setViewExpand(true)
  }
  const handleReduceRelatedTag = () => {
    setViewExpand(false)
  }
  return (
    <div>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={<Typography variant="body1">{DETAIL_CONST.ABOUT.TITLE}</Typography>}
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
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      <Card sx={{ mb: 3}}>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={
            <Typography variant="body2">{DETAIL_CONST.RELATED_TAG.TITLE}</Typography>
          }
        />
        <CardContent sx={{ p: 0}}>
          <List>
            {viewExpand ? (data.relatedTags.map((tag, index) =>
              index === data.relatedTags.length - 1 ? (
                <RelatedTagCell key={index} data={tag} lastItem />
              ) : (
                <RelatedTagCell key={index} data={tag} />
              )
            )) : (data.relatedTags.slice(0, DETAIL_CONST.RELATED_TAG.OVERFLOW_NUM).map((tag, index) =>
              index === data.relatedTags.length - 1 ? (
                <RelatedTagCell key={index} data={tag} lastItem />
              ) : (
                <RelatedTagCell key={index} data={tag} />
              )
            ))}
          </List>
          {!viewExpand ? (
            <Button
            sx={{ width: '100%' }}
            variant="outlined"
            onClick={handleExpandRelatedTag}
          >
            <ExpandMoreIcon />
            <Typography>{DETAIL_CONST.RELATED_TAG.EXPAND}</Typography>
            <ExpandMoreIcon />
          </Button>
          ) : (
            <Button
            sx={{ width: '100%' }}
            variant="outlined"
            onClick={handleReduceRelatedTag}
          >
            <ExpandLessIcon />
            <Typography>{DETAIL_CONST.RELATED_TAG.REDUCE}</Typography>
            <ExpandLessIcon />
          </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={<Typography variant="body2">{DETAIL_CONST.EXTRA_TITLE}</Typography>}
        />
        <CardContent>
          <Typography color="text.secondary" variant="body2">
            Dolor nulla non culpa commodo cupidatat esse eiusmod sit excepteur. Commodo duis officia
            incididunt sit. Occaecat non voluptate fugiat velit duis dolor consequat sit laborum
            amet culpa laborum cillum enim. Laborum eu elit reprehenderit anim consectetur. Esse
            nisi anim non consequat tempor. Proident labore eu proident magna velit. Officia elit
            enim sit sunt tempor do consequat.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SidebarDetail

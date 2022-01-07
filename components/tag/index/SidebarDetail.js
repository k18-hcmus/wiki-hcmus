import React, { useState } from 'react'
import { Card, CardContent, Typography, CardHeader, Button, List } from '@mui/material'
import { TAG_DETAIL, COLOR_SET } from '../../../shared/constants'
import RelatedTagCell from '../related-tag/RelatedTagCell'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import AbstractTag from '../../commons/abstract-tag'

const SidebarDetail = ({ data }) => {
  const [viewExpand, setViewExpand] = useState(false)
  const DETAIL_CONST = TAG_DETAIL.SIDEBAR_DETAIL
  const handleExpandRelatedTag = () => {
    setViewExpand(true)
  }
  const handleReduceRelatedTag = () => {
    setViewExpand(false)
  }
  return (
    <div>
      <AbstractTag data={data} isDetailPage/>
      <Card sx={{ mb: 3 }}>
        <CardHeader
          sx={{ backgroundColor: COLOR_SET.BLUE, color: 'white' }}
          title={<Typography variant="body2">{DETAIL_CONST.RELATED_TAG.TITLE}</Typography>}
        />
        <CardContent sx={{ p: 0 }}>
          <List>
            {viewExpand
              ? data.relatedTags.map((tag, index) =>
                  index === data.relatedTags.length - 1 ? (
                    <RelatedTagCell key={index} data={tag} lastItem />
                  ) : (
                    <RelatedTagCell key={index} data={tag} />
                  )
                )
              : data.relatedTags
                  .slice(0, DETAIL_CONST.RELATED_TAG.OVERFLOW_NUM)
                  .map((tag, index) =>
                    index === data.relatedTags.length - 1 ? (
                      <RelatedTagCell key={index} data={tag} lastItem />
                    ) : (
                      <RelatedTagCell key={index} data={tag} />
                    )
                  )}
          </List>
          {!viewExpand ? (
            <Button sx={{ width: '100%' }} variant="outlined" onClick={handleExpandRelatedTag}>
              <ExpandMoreIcon />
              <Typography>{DETAIL_CONST.RELATED_TAG.EXPAND}</Typography>
              <ExpandMoreIcon />
            </Button>
          ) : (
            <Button sx={{ width: '100%' }} variant="outlined" onClick={handleReduceRelatedTag}>
              <ExpandLessIcon />
              <Typography>{DETAIL_CONST.RELATED_TAG.REDUCE}</Typography>
              <ExpandLessIcon />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default SidebarDetail

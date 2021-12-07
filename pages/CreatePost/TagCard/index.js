import { Icon } from '@iconify/react'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
// material
import { alpha, styled } from '@mui/material/styles'
import {
  Grid,
  Box,
  Link,
  Card,
  Avatar,
  Typography,
  CardContent,
} from '@mui/material'
// utils
import { fDate } from '../../../utils/formatTime'
import { fShortenNumber } from '../../../utils/formatNumber'
//
import SvgIconStyle from './SvgIconStyle'

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
})

const NameStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
})

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}))

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}))

// ----------------------------------------------------------------------

export default function BlogTagCard({ tag }) {
  const { name, posts, votes, iconTag, createdAt, description } = tag[0]
  console.log(tag)

  return (
    <Card sx={{ position: 'relative' }}>
      <CardMediaStyle
        sx={{
          pt: 'calc(100% * 1 / 5)',
          '&:after': {
            top: 0,
            content: "''",
            width: '100%',
            height: '100%',
            position: 'absolute',
            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
          },
        }}
      >
        <SvgIconStyle
          color="paper"
          src="/static/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
          }}
        />
        <AvatarStyle alt={name} src={iconTag} />
      </CardMediaStyle>

      <CardContent>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          Created At {fDate(createdAt)}
        </Typography>

        <NameStyle color="inherit" variant="subName2" underline="hover">
          {name}
        </NameStyle>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          {description}
        </Typography>
        <InfoStyle>
          <Box sx={{ mr: 1 }}>
            <PostAddIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
            <Typography start variant="caption">
              {fShortenNumber(posts)}
            </Typography>
          </Box>
          <Box>
            <ThumbUpIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
            <Typography start variant="caption">
              {fShortenNumber(votes)}
            </Typography>
          </Box>
        </InfoStyle>
      </CardContent>
    </Card>
  )
}

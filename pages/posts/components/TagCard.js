import PostAddIcon from '@mui/icons-material/PostAdd'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { alpha, styled } from '@mui/material/styles'
import { Box, Card, Avatar, Typography, CardContent } from '@mui/material'
import { fDate } from '../../../utils/formatTime'
import SvgIconStyle from './SvgIconStyle'
import Link from 'next/link'

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

export default function TagCard({ tag }) {
  const { id, Name, posts, votes, iconTag, created_at, Description } = tag

  return (
    <Card sx={{ position: 'relative', my: 1 }}>
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
          src=""
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
          }}
        />
        <AvatarStyle alt={Name} src={iconTag} />
      </CardMediaStyle>

      <CardContent>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          Created At {fDate(created_at)}
        </Typography>

        <NameStyle color="inherit" variant="subName2" href={`/tags/${id}`}>
          {Name}
        </NameStyle>
        <Typography
          gutterBottom
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block' }}
        >
          {Description}
        </Typography>
        <InfoStyle>
          <Box sx={{ mr: 1 }}>
            <PostAddIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
            <Typography variant="caption">{posts}</Typography>
          </Box>
          <Box>
            <ThumbUpIcon sx={{ width: 16, height: 16, mr: 0.5 }} />
            <Typography variant="caption">{votes}</Typography>
          </Box>
        </InfoStyle>
      </CardContent>
    </Card>
  )
}

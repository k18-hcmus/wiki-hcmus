import { Box, Typography } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

const ChangeArrow = (props) => {
  const { currentValue, lastestValue, context } = props
  const colorValue = currentValue < lastestValue ? 'error' : 'success'
  let value = 0
  if (currentValue !== lastestValue || currentValue !== 0) {
    value = Math.trunc(Math.abs(1 - currentValue / lastestValue) * 100)
  }
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        pt: 2,
      }}
    >
      {currentValue < lastestValue ? (
        <ArrowDownwardIcon color={colorValue} />
      ) : (
        <ArrowUpwardIcon color={colorValue} />
      )}
      <Typography
        color={colorValue}
        sx={{
          mr: 1,
        }}
        variant="body2"
      >
        {value}%
      </Typography>
      <Typography color="textSecondary" variant="caption">
        {context}
      </Typography>
    </Box>
  )
}

export default ChangeArrow

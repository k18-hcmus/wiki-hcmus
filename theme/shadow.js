import { alpha } from '@mui/material/styles'
import palette from './palette'

const LIGHT_MODE = palette.grey[500]

const createCustomShadow = (color) => {
  const transparent = alpha(color, 0.24)

  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 0 2px 0 ${transparent}, 0 12px 24px 0 ${transparent}`,
    z16: `0 0 2px 0 ${transparent}, 0 16px 32px -4px ${transparent}`,
    z20: `0 0 2px 0 ${transparent}, 0 20px 40px -4px ${transparent}`,
    z24: `0 0 4px 0 ${transparent}, 0 24px 48px 0 ${transparent}`,
    primary: `0 8px 16px 0 ${alpha(palette.primary.main, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(palette.secondary.main, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(palette.info.main, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(palette.success.main, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(palette.warning.main, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(palette.error.main, 0.24)}`,
  }
}

const customShadows = createCustomShadow(LIGHT_MODE)

export default customShadows

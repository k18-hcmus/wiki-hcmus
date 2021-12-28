import { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'
import palette from './palette'
import customShadows from './shadow'
import shape from './shape'
export default function ThemeConfig({ children }) {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      customShadows,
    }),
    []
  )

  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

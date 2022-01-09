import '../styles/globals.css'
import { useRef } from 'react'
import Layout from '../Layout'
import ThemeConfig from '../theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import RoleBasedComponent from '../components/commons/RoleBasedComponent'
import { SnackbarProvider } from 'notistack'
import Slide from '@mui/material/Slide'
import { Button } from '@mui/material'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
  template: '<div class="bar" role="bar" background-color: white;"></div>',
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  const notistackRef = useRef(null)
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <Provider store={store}>
      <ThemeConfig>
        <Layout>
          <SnackbarProvider
            ref={notistackRef}
            action={(key) => (
              <Button
                onClick={onClickDismiss(key)}
                sx={{ color: (theme) => theme.palette.primary.contrastText }}
              >
                Dismiss
              </Button>
            )}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            TransitionComponent={Slide}
          >
            <RoleBasedComponent Component={Component} pageProps={pageProps} />
          </SnackbarProvider>
        </Layout>
      </ThemeConfig>
    </Provider>
  )
}

export default MyApp

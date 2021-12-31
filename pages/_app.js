import '../styles/globals.css'
import Layout from '../Layout'
import ThemeConfig from '../theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
})

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeConfig>
    </Provider>
  )
}

export default MyApp

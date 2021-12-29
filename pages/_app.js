import '../styles/globals.css'
import Layout from '../Layout'
import ThemeConfig from '../theme'
import { Provider } from 'react-redux'
import store from '../redux/store'
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

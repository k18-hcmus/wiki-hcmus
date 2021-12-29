import { useRouter } from 'next/router'
const AuthRoute = (props) => {
  const router = useRouter()
  // checks whether we are on client / browser or server.
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem('token')
    if (!accessToken) {
      router.replace('/')
      return null
    }

    return props.children
  }
  // If we are on server, return null
  return null
}

export default AuthRoute

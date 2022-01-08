import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUser, getLoadingUser, getUserAuth } from '../../redux/slices/userSlice'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'

const RoleBasedComponent = ({ Component, pageProps }) => {
  const user = useSelector(getUser)
  const loading = useSelector(getLoadingUser)
  const isAuth = useSelector(getUserAuth)
  const router = useRouter()

  let role
  let allowed = true
  let needAllowed = false

  if (router.pathname.startsWith('/admin')) {
    needAllowed = true
  }

  if (user) {
    role = user.role
  }
  if (router.pathname.startsWith('/admin') && !role) {
    allowed = false
  } else if (
    router.pathname.startsWith('/admin') &&
    role &&
    role.type !== 'moderator' &&
    role.type !== 'adminstrator'
  ) {
    allowed = false
  }

  useEffect(() => {
    if (!loading && !allowed) {
      router.push('/')
    }
  }, [loading])

  if (needAllowed && (loading || !allowed)) {
    return <CircularProgress />
  }

  return <Component {...pageProps} />
}

export default RoleBasedComponent

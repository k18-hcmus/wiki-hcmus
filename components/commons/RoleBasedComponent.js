import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/slices/userSlice'
import { useRouter } from 'next/router'

const RoleBasedComponent = ({ Component, pageProps }) => {
  const user = useSelector(getUser)
  const router = useRouter()

  let role
  let allowed = true

  if (user) {
    role = user.role
  }

  if (router.pathname.startsWith('/admin') && !role) {
    allowed = false
  } else if (
    router.pathname.startsWith('/admin') &&
    role &&
    (role.type !== 'moderator' || role.type !== 'adminstrator')
  ) {
    allowed = false
  }

  useEffect(() => {
    if (!allowed) {
      router.push('/')
    }
  }, [])

  return <Component {...pageProps} />
}

export default RoleBasedComponent

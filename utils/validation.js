export const isLength = (password) => {
  if (password.length < 6) return true
  return false
}
export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
export const checkAdmin = (user) => {
  if (user.role.name == 'Adminstrator') {
    return true
  }
  return false
}

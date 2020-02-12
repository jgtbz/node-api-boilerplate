import jwtDecode from 'jwt-decode'

export default (req, _, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]

    if (token) {
      const decoded = jwtDecode(token)
      req.user = decoded
      next()
      return
    }
  }

  req.user = {}
  next()
}

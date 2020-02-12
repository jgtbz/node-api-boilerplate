export default (err, _, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized')
    next()
  }
}

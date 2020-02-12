const makeFormat = (req) => (acc, { where, to }) => {
  const { instance, key } = where
  const { field, handler = (value) => value } = to

  const value = req[instance][key]

  return {
    ...acc,
    [field]: handler(value)
  }
}

export default (...props) => (req, _, next) => {
  const format = makeFormat(req)

  const autoInject = props.reduce(format, {})

  req.autoInject = autoInject

  next()
}

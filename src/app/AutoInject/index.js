export default (...props) => (req, _, next) => {
  const autoInject = props.reduce((acc, { where, to }) => {
    const { instance, key } = where
    const { field, handler = (value) => value } = to

    const value = req[instance][key]

    return {
      ...acc,
      [field]: handler(value)
    }
  }, {})

  req.autoInject = autoInject

  next()
}

const matchFields = (fields, condition) => ([ key ]) => fields.includes(key) === condition

const reducer = (acc, [ key, value ]) => ({ ...acc, [key]: value })

export default ({ condition }) => ({ instance, fields }) => (req, _, next) => {
  const reqInstance = req[instance]

  const matcher = matchFields(fields, condition)

  const newInstance = Object
    .entries(reqInstance)
    .filter(matcher)
    .reduce(reducer, {})

  req[instance] = newInstance

  next()
}

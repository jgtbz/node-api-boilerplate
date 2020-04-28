export default (condition) => (instance, fields) => (req, _, next) => {
  fields = Array.isArray(fields)
    ? fields
    : fields.split(',')
  
  const reqInstance = req[instance]

  const removeUnnecessaryFields = ([key]) => fields.includes(key) === condition

  const newInstance = Object
    .entries(reqInstance)
    .filter(removeUnnecessaryFields)

  req[instance] = Object.fromEntries(newInstance)

  next()
}

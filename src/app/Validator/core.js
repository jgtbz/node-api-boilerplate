export default (instance, validators) => (req, _, next) => {
  const reqInstance = req[instance]

  const errors = Object
    .entries(validators)
    .reduce((result, [ key, validator ]) => {
      const value = reqInstance[key]
      
      const isValid = validator.validate(value, reqInstance)

      const error = isValid
        ? { [key]: validator.message }
        : {}

      return {
        ...result,
        ...error
      }
    }, {})

  const hasError = !!Object.keys(errors).length

  if (hasError) {
    const onErrorMessage = onActivateDeactivateError(responseConfig)
    const errorResponse = onError({ status: 403, message, err, res })

    res.status(403).send(errorResponse)
  }

  next()
}

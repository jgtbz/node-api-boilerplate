import { onError } from '../../app/MongoDBControllers/Responses'

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
    const errorResponse = onError({ status: 403, message: 'Dados inválidos', err: errors, res })

    console.log(errorResponse)

    return res.status(403).send(errorResponse)
  }

  next()
}

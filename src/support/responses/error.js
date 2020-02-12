import propsDescriptions from '../../support/propsDescriptions' 
import { concatMany } from '../../support/utils'

const buildDescription = (key, message) => propsDescriptions[key] && concatMany(propsDescriptions[key], ': ', message)

const format = ([ key, { message } ]) => ({ name: key, error: message, description: buildDescription(key, message) })

export default ({ status, message, customErrorMessage, err = {}, res = {} }) => {
  console.log(err)

  const validators = err.errors || err

  const errors = Object
    .entries(validators)
    .map(format)

  const response = {
    status,
    message: customErrorMessage || message,
    errors
  }

  res.response = response

  return response
}

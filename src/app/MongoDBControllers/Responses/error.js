import { concatMany } from '../../../support/utils'

import props from '../../../support/props' 

const buildProps = (key, message) => props[key] && concatMany(props[key], ': ', message)

const format = ([ key, { message } ]) => ({ name: key, error: message, description: buildProps(key, message) })

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
  
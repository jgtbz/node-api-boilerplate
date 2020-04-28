import { onSuccess, onError } from '../Responses'
import { onPatchSuccess, onPatchError } from '../Responses/messages'
import { updateOptions, notFound } from './_utils'

const mountUpdateKey = (field, key) => [`${field}.$.${key}`]

const mountUpdate = (payload, field) => {
  const reducer = (acc, [ key, value ]) => ({ ...acc, [ mountUpdateKey(field, key) ]: value })
  return Object
    .entries(payload)
    .reduce(reducer, {})
}

export default ({ Model, messageConfig }) => (field, customMessageConfig) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { params, autoInject = {}, body } = req
    const { id } = params

    const finder = {
      _id: id,
      [ `${field}._id` ]: body._id,
      ...autoInject
    }

    const update = {
      $set: mountUpdate(body, field)
    }

    const model = await Model.findOneAndUpdate(finder, update, updateOptions)

    if (!model) {
      return res.status(404).send(notFound)
    }

    const onSuccessMessage = onPatchSuccess(responseConfig)
    const successResponse = onSuccess({ status: 200, message: onSuccessMessage, customSuccessMessage, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onPatchError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })
    
    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

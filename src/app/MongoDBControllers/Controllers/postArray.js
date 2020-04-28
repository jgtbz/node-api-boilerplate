import { onSuccess, onError } from '../Responses'
import { onPostSuccess, onPostError } from '../Responses/messages'
import { updateOptions, notFound } from './_utils'

export default ({ Model, messageConfig }) => (field, customMessageConfig) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { params, autoInject = {}, body } = req
    const { id } = params

    const finder = {
      _id: id,
      ...autoInject
    }

    const update = {
      $addToSet: { [field]: body }
    }

    const model = await Model.findOneAndUpdate(finder, update, updateOptions)

    if (!model) {
      return res.status(404).send(notFound)
    }

    const onSuccessMessage = onPostSuccess(responseConfig)
    const successResponse = onSuccess({ status: 200, message: onSuccessMessage, customSuccessMessage, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onPostError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })
    
    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

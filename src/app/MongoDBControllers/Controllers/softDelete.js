import { onSuccess, onError } from '../Responses'
import { onDeleteSuccess, onDeleteError } from '../Responses/messages'
import { updateOptions, notFound } from './_utils'

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { params, autoInject = {} } = req
    const { id } = params

    const finder = {
      _id: id,
      ...autoInject
    }

    const update = { status: 'deleted' }
    const model = await Model.findOneAndUpdate(finder, update, updateOptions)

    if (!model) {
      return res.status(404).send(notFound)
    }

    const onSuccessMessage = onDeleteSuccess(responseConfig)
    const successResponse = onSuccess({ status: 200, message: onSuccessMessage, customSuccessMessage, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onDeleteError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })
    
    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

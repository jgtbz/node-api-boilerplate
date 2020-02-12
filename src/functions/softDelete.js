import { onSuccess, onError } from '../support/responses'
import { onDeleteSuccess, onDeleteError } from '../support/responses/messages'
import { updateOptions, unauthorizedModel } from './_utils'

export default ({ Schema, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { params, autoInject = {} } = req
    const { id } = params

    const finder = {
      _id: id,
      ...autoInject
    }

    const update = { status: 'deleted' }
    const model = await Schema.findOneAndUpdate(finder, update, updateOptions)

    if (!model) {
      return res.status(401).send(unauthorizedModel)
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

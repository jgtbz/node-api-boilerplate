import { onSuccess, onError } from '../support/responses'
import {
  onActivateDeactivateSuccess,
  onActivateDeactivateError
} from '../support/responses/messages'
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

    const model = await Schema.findOne(finder)

    if (!model) {
      return res.status(404).send(unauthorizedModel)
    }

    const status = model.status === 'active' ? 'inactive' : 'active'

    const update = { status }
    await Schema.findOneAndUpdate(finder, update, updateOptions)

    const onSuccessMessage = onActivateDeactivateSuccess(responseConfig)
    const successResponse = onSuccess({ status: 200, message: onSuccessMessage, customSuccessMessage, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onActivateDeactivateError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })

    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

import { onSuccess, onError } from '../support/responses'
import { onPostSuccess, onPostError } from '../support/responses/messages'

export default ({ Schema, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { body, autoInject = {} } = req

    const payload = {
      ...body,
      ...autoInject
    }

    await Schema(payload).save()

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

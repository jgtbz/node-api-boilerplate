import { Types } from 'mongoose'
import { onSuccess, onError } from '../Responses'
import { onGetByIdSuccess, onGetByIdError } from '../Responses/messages'
import { unauthorizedModel } from './_utils'

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { autoInject = {}, params, pipeline = [] } = req
    const { id } = params

    const [ model ] = await Model.aggregate([
      { $match: { _id: Types.ObjectId(id), ...autoInject } },
      ...pipeline
    ])

    if (!model) {
      return res.status(401).send(unauthorizedModel)
    }

    const onSuccessMessage = onGetByIdSuccess(responseConfig)
    const successResponse = onSuccess({ status: 200, message: onSuccessMessage, customSuccessMessage, data: model, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onGetByIdError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })
    
    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

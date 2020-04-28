import { Types } from 'mongoose'
import { onSuccess, onError } from '../Responses'
import { onPatchSuccess, onPatchError } from '../Responses/messages'
import { updateOptions, notFound } from './_utils'

export default ({ Model, messageConfig }) => (field, customMessageConfig) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { params, autoInject = {}, body } = req
    const { id } = params

    const matcher = body._id

    const finder = {
      _id: id,
      [ `${field}._id` ]: matcher,
      ...autoInject
    }

    const model = await Model.findOne(finder)

    if (!model) {
      return res.status(404).send(notFound)
    }

    const [ { models } ] = await Model.aggregate([
      { $match: {
        _id: Types.ObjectId(_id)
      }},
      { $unwind: `$${field}` },
      { $project: {
        _id: `$${field}._id`,
        payload: `$${field}`
      }},
      { $match: { _id: { $ne: Types.ObjectId(matcher) } } },
      { $group: {
        _id: null,
        models: {
          $push: '$payload'
        }
      }}
    ])

    const update = { [field]: models }
    await Model.findOneAndUpdate(finder, update, updateOptions)

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

import { onSuccess, onError } from '../../Responses'
import { onPatchSuccess, onPatchError } from '../../Responses/messages'
import { updateOptions, notFound } from '../_utils'

import Email from '../../../Services/Email'

import { randomHash } from '../../../../support/utils'

import moment from 'moment'

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { email } = req.body

    const model = await Model
      .findOne({ email })
      .select('_id')
      .lean()

    if (!model) {
      return res.status(404).send(notFound)
    }

    const code = randomHash({ length: 6 })
    const expiresIn = moment().add(4, 'hours').toDate()

    const forgotPassword = {
      code,
      expiresIn
    }

    Email.sendEmail({
      to: email,
      subject: 'Recuperaçao de senha',
      html: `Code: ${code}`
    })

    const update = { $set: { forgotPassword } }

    await Model.findByIdAndUpdate(model._id, update, updateOptions)

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

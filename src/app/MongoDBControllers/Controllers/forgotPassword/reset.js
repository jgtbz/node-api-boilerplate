import { onSuccess, onError } from '../../Responses'
import { onPatchSuccess, onPatchError } from '../../Responses/messages'
import { updateOptions } from '../_utils'

import { genSalt, hash } from 'bcryptjs'

import moment from 'moment'

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { code, email, password } = req.body

    const model = await Model
      .findOne({ email, 'forgotPassword.code': code })
      .select('forgotPassword')
      .lean()

    if (!model) {
      return res.status(403).json({ message: 'Código inválido' })
    }

    const now = moment()

    if (now.isAfter(model.forgotPassword.expiresIn)) {
      return res.status(403).json({ message: 'Código expirado' })
    }

    const salt = await genSalt(10)
    const hashPassword = await hash(password, salt)

    const update = {
      $set: {
        password: hashPassword,
        forgotPassword: { code: null, expiresIn: null }
      }
    }

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

import { onSuccess, onError } from '../Responses'
import { onPatchSuccess, onPatchError } from '../Responses/messages'
import { updateOptions } from './_utils'

import { compareSync, genSalt, hash } from 'bcryptjs'

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { user, body } = req
    const { id } = user
    const { currentPassword, password } = body

    const model = await Model.findById(id)

    const response = await compareSync(currentPassword, model.password)
  
    if (!response) {
      return res.status(403).json({ message: 'Senhas não conferem' })
    }

    const salt = await genSalt(10)
    const hashPassword = await hash(password, salt)

    const update = { password: hashPassword }

    await Model.findByIdAndUpdate(id, update, updateOptions)

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

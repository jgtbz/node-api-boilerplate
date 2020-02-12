import { onError } from '../support/responses'

import { addressValidator } from '../support/validations'
import { INVALID } from '../support/validations/messages'

export default ({ messageConfig, messageCallback }) => async (req, res, next) => {
  const { zipcode, state, city } = req.body

  const response = await addressValidator({ zipcode, state, city })

  if (!response) {
    const onErrorMessage = messageCallback(messageConfig)
    const errorResponse = onError(409, onErrorMessage, { addresses: { message: INVALID } })

    return res.status(409).json(errorResponse)
  }

  next()
}

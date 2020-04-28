import { onError } from '../app/MongoDBControllers/Responses'

import { addressValidator, messages } from '../support/validators'

export default ({ messageConfig, messageCallback }) => async (req, res, next) => {
  const { zipcode, state, city } = req.body

  const response = await addressValidator({ zipcode, state, city })

  if (!response) {
    const onErrorMessage = messageCallback(messageConfig)
    const errorResponse = onError(409, onErrorMessage, { addresses: { message: messages.INVALID } })

    return res.status(409).json(errorResponse)
  }

  next()
}

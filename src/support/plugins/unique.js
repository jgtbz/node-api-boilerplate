import uniqueValidator from 'mongoose-unique-validator'

import { messages } from '../validators'

export default (Schema) => Schema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: messages.UNIQUE
})

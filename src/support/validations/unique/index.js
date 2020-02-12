import uniqueValidator from 'mongoose-unique-validator'

import { UNIQUE } from '../messages'

export default (Schema) => Schema.plugin(uniqueValidator, {
  type: 'mongoose-unique-validator',
  message: UNIQUE
})

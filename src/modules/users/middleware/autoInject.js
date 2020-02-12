import { Types } from 'mongoose'

import { autoInject } from '../../../middleware'

export default autoInject({
  where: { instance: 'user', key: 'id' },
  to: { field: '_id', handler: (value) => Types.ObjectId(value) }
})

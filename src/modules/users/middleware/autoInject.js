import { Types } from 'mongoose'

import AutoInject from '../../../app/AutoInject'

export default AutoInject({
  where: { instance: 'user', key: 'id' },
  to: { field: '_id', handler: (value) => Types.ObjectId(value) }
})

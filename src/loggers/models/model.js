import { ObjectId, Mixed } from 'mongoose'

export default {
  actor: {
    type: ObjectId,
    ref: 'users'
  },
  url: String,
  module: String,
  endpoint: String,
  method: String,
  req: {
    params: Mixed,
    query: Mixed,
    body: Mixed,
    paginate: Mixed,
    sort: Mixed
  },
  response: Mixed,
  apiVersion: String,
  status: String
}

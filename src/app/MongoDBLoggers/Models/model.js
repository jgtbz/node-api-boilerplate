import { model, Schema } from 'mongoose'

import SCHEMA from './schema'

const name = 'loggers'

const schema = new Schema(SCHEMA, {
  timestamps: true
})

const MODEL = model(name, schema, name)

export default MODEL

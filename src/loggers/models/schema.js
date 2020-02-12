import { model, Schema } from 'mongoose'

import MODEL from './model'

const name = 'loggers'

const schema = new Schema(MODEL, {
  timestamps: true
})

const SCHEMA = model(name, schema, name)

export default SCHEMA

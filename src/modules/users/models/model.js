import { model, Schema } from 'mongoose'
import { compareSync, genSalt, hash } from 'bcryptjs'

import { uniquePlugin, existsPlugin, aggregatePaginatePlugin } from '../../../support/plugins'

import SCHEMA from './schema'

const name = 'users'

const schema = new Schema(SCHEMA, {
  timestamps: true
})

uniquePlugin(schema)
existsPlugin(schema)
aggregatePaginatePlugin(schema)

schema.pre('save', async function (next) {
  const passwordHasModified = this.isModified('password')
  if (!passwordHasModified) {
    next()
    return
  }
  const salt = await genSalt(10)
  const hashPassword = await hash(this.password, salt)

  this.password = hashPassword
  next()
})

schema.methods.comparePassword = function (candidatePassword) {
  return compareSync(candidatePassword, this.password)
}

const MODEL = model(name, schema, name)

export default MODEL

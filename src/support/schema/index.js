import { model, Schema } from 'mongoose'

import { uniqueValidator, existsValidator } from '../../../support/validations'

const Plugins = {
  uniqueValidator,
  existsValidator
}

const pluginsRegister = (schema) => ({ name, options }) => Plugins[name](schema, options)
const registerIndexes = (schema) => (index) => schema.index(index)

export default (name, MODEL = {}, { plugins = [], indexes = [] }) => {
  const schema = new Schema(MODEL, {
    timestamps: true
  })

  const registerPlugin = pluginsRegister(schema)
  const registerIndexes = registerIndexes(schema)

  plugins.forEach(registerPlugin)
  indexes.forEach(registerIndexes)

  return model(name, schema, name)
}

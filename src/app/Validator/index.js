import core from './core'

import { curry } from 'ramda'

const curried = curry(core)

const params = curried('params')
const query = curried('query')
const body = curried('body')

export default {
  validate: core,
  params,
  query,
  body
}

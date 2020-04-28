import core from './core'

import { curry } from 'ramda'

const accept = core(true)
const ignore = core(false)

const curriedAccept = curry(accept)
const curriedIgnore = curry(ignore)

const acceptQuery = curriedAccept('query')
const acceptParams = curriedAccept('params')
const acceptBody = curriedAccept('body')
const ignoreQuery = curriedIgnore('query')
const ignoreParams = curriedIgnore('params')
const ignoreBody = curriedIgnore('body')

export default {
  accept,
  acceptQuery,
  acceptParams,
  acceptBody,
  ignore,
  ignoreQuery,
  ignoreParams,
  ignoreBody
}

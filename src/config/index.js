import local from './local'
import server from './server'

const configs = {
  local,
  development: server,
  staging: server,
  production: server
}

const config = configs[process.env.NODE_ENV]

export { default as unlessPath } from './unlessPath'

export default config

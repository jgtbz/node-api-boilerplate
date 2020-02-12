import jwt from 'express-jwt'

import config, { unlessPath } from '../config'

export default jwt({ secret: config.secret }).unless(unlessPath)

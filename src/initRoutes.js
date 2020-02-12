import fs from 'fs'

import { afterLoggers } from './loggers'

const base = '/api/v1'

const ignoreBasicModule = (MODULE) => MODULE !== '_basic'

const start = (app) => (MODULE) => {
  try {
    const Route = require(`${__dirname}/modules/${MODULE}/routes`).default
    const path = `${base}/${MODULE}/`
    console.log({ path })
    app.use(path, Route, afterLoggers)
  } catch (err) {
    console.log(err)
  }
}

export default (app) => {
  const makeStart = start(app)

  const modules = fs.readdirSync(`${__dirname}/modules`)
  modules
    .filter(ignoreBasicModule)
    .forEach(makeStart)

  app.use(({ originalUrl }, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Invalid Route.',
      route: originalUrl
    })
    next()
  })
}

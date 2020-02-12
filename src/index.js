import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { beforeLoggers } from './loggers'
import {
  decoder,
  filters,
  paginate,
  sort,
  pipeline,
  unauthorized,
  jwt
} from './middleware'

import initDatabase from './initDatabase'
import initRoutes from './initRoutes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use(compression())

app.use(helmet())

app.use(decoder)
app.use(filters)
app.use(paginate)
app.use(sort)
app.use(pipeline)
app.use(beforeLoggers)

app.use(jwt)

initDatabase()
initRoutes(app)

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`))

app.use(unauthorized)

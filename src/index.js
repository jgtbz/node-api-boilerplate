import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import MongoDBLoggers from './app/MongoDBLoggers'
import PaginateSort from './app/PaginateSort'
import Pipeline from './app/Pipeline'
import JWT from './app/JWT'
import MongoDBFilters from './app/MongoDBFilters'

import initDatabase from './initDatabase'
import initRoutes from './initRoutes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use(compression())
app.use(helmet())

app.use(JWT.decoder)
app.use(PaginateSort.paginate)
app.use(PaginateSort.sort)
app.use(Pipeline)
app.use(MongoDBFilters)
app.use(MongoDBLoggers.beforeLoggers)

app.use(JWT.jwt)

initDatabase()
initRoutes(app)

app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`))

app.use(JWT.unauthorized)

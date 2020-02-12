import Schema from './models/schema'

const ignore = (url) => !url.includes('api')

const getModule = (url) => url.split('/api/')[1].split('/')[1]
const getApiVersion = (url) => url.split('/api/')[1].split('/')[0]
const getEndpoint = (url, delimiter) => url.split(delimiter)[1]

export default async (req, _, next) => {
  const {
    params,
    query,
    body,
    paginate,
    sort,
    user,
    method,
    originalUrl
  } = req

  const shouldIgnore = ignore(originalUrl)

  if (shouldIgnore) {
    next()
    return
  }

  const module = getModule(originalUrl)
  const apiVersion = getApiVersion(originalUrl)
  const endpoint = getEndpoint(originalUrl, module)

  console.log({
    originalUrl,
    method,
    module,
    endpoint
  })

  const payload = {
    actor: user.id,
    url: originalUrl,
    module,
    endpoint,
    method,
    req: {
      params,
      query,
      body,
      paginate,
      sort
    },
    apiVersion
  }

  const model = await Schema(payload).save()

  req.logger = model._id

  next()
}

import Model from './models'

export default async (req, res) => {
  const { logger } = req
  const { response, statusCode } = res

  console.log({ response, status: statusCode })

  await Model.findByIdAndUpdate(logger, { response, status: statusCode })

  res.end()
}

import { onSuccessWithData, onError } from '../Responses'
import { onGetSuccess, onGetError } from '../Responses/messages'
import { notFound } from './_utils'

const paginateOptions = {
  totalDocs: 'total',
  docs: 'docs',
  limit: 'limit',
  page: 'page',
  totalPages: 'pages',
  nextPage: 'next',
  prevPage: 'prev',
  hasPrevPage: 'hasPrev',
  hasNextPage: 'hasNext',
  pagingCounter: 'counter'
}

export default ({ Model, messageConfig }) => ({ customMessageConfig, customSuccessMessage, customErrorMessage } = {}) => async (req, res, next) => {
  const responseConfig = customMessageConfig || messageConfig
  try {
    const { filters, autoInject = {}, pipeline = [], sort, paginate } = req

    const pipes = [
      { $match: { ...filters, ...autoInject } },
      ...pipeline,
      { $sort: { ...sort } }
    ]

    const aggregate = Model.aggregate(pipes)
    const data = await Model.aggregatePaginate(aggregate, { ...paginate, customLabels: paginateOptions })

    if (!data) {
      return res.status(404).send(notFound)
    }

    const onSuccessMessage = onGetSuccess(responseConfig)
    const successResponse = onSuccessWithData({ status: 200, message: onSuccessMessage, customSuccessMessage, data, res })

    res.status(200).send(successResponse)
  } catch (err) {
    const onErrorMessage = onGetError(responseConfig)
    const errorResponse = onError({ status: 409, message: onErrorMessage, customErrorMessage, err, res })

    res.status(409).send(errorResponse)
  } finally {
    next()
  }
}

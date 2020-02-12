import { count } from './aggregation'

const getUntilLookup = (pipeline) => {
  let stop = false

  const results = []

  pipeline.forEach(pipe => {
    if (!pipe.$lookup && !stop) {
      results.push(pipe)
      return
    }

    stop = true
  })

  return results
}

export default async (Schema, pipeline, { page, limit }) => {
  try {
    const $matches = getUntilLookup(pipeline)

    const [ res = { count: 0 } ] = await Schema.aggregate([
      ...$matches,
      { ...count }
    ])

    const total = res.count

    const pages = Math.ceil(total / limit)
    const skip = limit * (page - 1)

    const docs = await Schema.aggregate([
      ...$matches,
      { $skip: skip },
      { $limit: limit },
      ...pipeline
    ])

    if (!docs.length) {
      return null
    }

    return { docs, page, pages, limit, total }
  } catch (err) {
    throw err
  }
}

import { head } from 'ramda'

export default async ({ Model, $match = {}, size = 1 }) => {
  const response = await Model.aggregate([
    { $match },
    { $sample: { size } }
  ])

  return size === 1 ? head(response) : response
}

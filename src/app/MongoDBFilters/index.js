import { string, self } from './Types'

const props = {
  name: string('name')
}

const removeEmpty = ([_, value]) => !!value

const transform = (props) => ([key, value]) => (props[key] || self(key))(value)

const reducer = (acc, { key, value }) => ({ ...acc, [key]: value })

export default (req, _, next) => {
  const { query } = req
  const { page, limit, orderBy, orderSort, ...fields } = query

  const mapTransform = transform(props)

  const filters = Object
    .entries(fields)
    .filter(removeEmpty)
    .map(mapTransform)
    .reduce(reducer, {})

  req.filters = filters

  next()
}

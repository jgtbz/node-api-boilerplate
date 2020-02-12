import { string, self } from '../support/filters'

const props = {
  name: string('name')
}

const removeEmpty = ([ _, value ]) => !!value

const transform = (props) => ([ key, value ]) => (props[key] || self(key))(value)

const reducer = (acc, { key, value }) => ({ ...acc, [key]: value })

export default (req, _, next) => {
  const { query } = req

  const mapTransform = transform(props)

  const filters = Object
    .entries(query)
    .filter(removeEmpty)
    .map(mapTransform)
    .reduce(reducer, {})

  req.filters = filters

  next()
}

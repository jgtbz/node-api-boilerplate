import handler from './handler'

const accept = handler({ condition: true })
const ignore = handler({ condition: false })

export {
  accept,
  ignore
}

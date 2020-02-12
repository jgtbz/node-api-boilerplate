export default (req, _, next) => {
  req.pipeline = [
    { $match: { status: { $ne: 'deleted' } } },
    { $project: {
      __v: false
    }}
  ]

  req.setPipeline = (pipeline) => {
    req.pipeline = [ ...req.pipeline, ...pipeline ]
  }

  next()
}

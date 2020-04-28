import UsersModel from '../../modules/users/models'

export default (...roles) => async (req, res, next) => {
  const { id } = req.user

  const user = await UsersModel
    .findById(id)
    .select('role status')
    .lean()

  if (!user || user.status !== 'active') {
    return res.status(401).json({})
  }

  const hasPermission = roles.includes(user.role)

  if (!hasPermission) {
    return res.status(401).json({})
  }

  next()
}

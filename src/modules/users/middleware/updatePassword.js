import Schema from '../models/model'

import { compareSync, genSalt, hash } from 'bcryptjs'

export default async (req, res, next) => {
  const { user, body } = req
  const { id } = user
  const { currentPassword, password } = body

  const model = await Schema.findById(id)

  const response = await compareSync(currentPassword, model.password)

  if (!response) {
    return res.status(403).json({ message: 'Senhas não conferem' })
  }

  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)

  req.body = { password: hashPassword }

  next()
}

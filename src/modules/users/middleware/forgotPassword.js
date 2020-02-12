import Schema from '../models/schema'

import { genSalt, hash } from 'bcryptjs'

import moment from 'moment'

export default async (req, res, next) => {
  const { code, email, password } = req.body

  const model = await Schema
    .findOne({ email, 'forgotPassword.code': code })
    .select('_id forgotPassword')
    .lean()

  if (!model) {
    return res.status(403).json({ message: 'Código inválido' })
  }

  const now = moment()

  if (now.isAfter(model.forgotPassword.expiresIn)) {
    return res.status(403).json({ message: 'Código expirado' })
  }

  const salt = await genSalt(10)
  const hashPassword = await hash(password, salt)

  req.params.id = model._id
  req.body = {
    password: hashPassword,
    forgotPassword: { code: null, expiresIn: null }
  }

  next()
}

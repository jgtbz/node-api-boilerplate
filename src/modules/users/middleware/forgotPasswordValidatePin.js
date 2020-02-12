import Schema from '../models/schema'

import moment from 'moment'

export default async (req, res, next) => {
  const { code, email } = req.body

  const model = await Schema
    .findOne({ email, 'forgotPassword.code': code })
    .select('forgotPassword')
    .lean()

  if (!model) {
    return res.status(403).json({ message: 'Código inválido' })
  }

  const now = moment()

  if (now.isAfter(model.forgotPassword.expiresIn)) {
    return res.status(403).json({ message: 'Código expirado' })
  }

  res.status(200).json({ message: 'Código válido' })

  next()
}

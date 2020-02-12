import config from '../../config'

import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: config.mailer
})

export default ({ to, subject, html }) => {
  transport.sendMail({
    from: config.mailer.user,
    to,
    subject,
    html
  })
}

import { Router } from 'express'

import Functions from '../support/functions'
import { accept } from '../../../middleware'
import {
  autoInject,
  forgotPasswordSendPin,
  forgotPasswordValidatePin,
  forgotPassword,
  updatePassword
} from '../middleware'

const Routes = Router()

Routes
  .get(
    '/',
    Functions.get()
  )
  .get(
    '/paginated',
    Functions.getWithPaginated()
  )
  .get(
    '/:id',
    Functions.getById()
  )
  .get(
    '/profile',
    autoInject,
    Functions.getById()
  )
  .post(
    '/login',
    accept({ instance: 'body', fields: [ 'email', 'password' ] }),
    Functions.login()
  )
  .post(
    '/',
    accept({ instance: 'body', fields: [ 'name', 'email', 'password' ] }),
    Functions.post({ customSuccessMessage: 'Cadastro realizado com sucesso' })
  )
  .patch(
    '/me',
    autoInject,
    accept({ instance: 'body', fields: [ 'name', 'email' ] }),
    Functions.patch({ customSuccessMessage: 'Dados atualizados com sucesso' })
  )
  .patch(
    '/password',
    autoInject,
    accept({ instance: 'body', fields: [ 'currentPassword', 'password', 'confirmPassword' ] }),
    updatePassword,
    Functions.patch({ customSuccessMessage: 'Senha alterada com sucesso' })
  )
  .patch(
    '/:id',
    accept({ instance: 'body', fields: [ 'name', 'email' ] }),
    Functions.patch({ customSuccessMessage: 'Dados atualizados com sucesso' })
  )
  .patch(
    '/forgot-password/send-pin',
    accept({ instance: 'body', fields: [ 'email' ] }),
    forgotPasswordSendPin,
    Functions.patch({ customSuccessMessage: 'Enviamos um código para o seu email' })
  )
  .patch(
    '/forgot-password/validate-pin',
    accept({ instance: 'body', fields: [ 'email', 'code' ] }),
    forgotPasswordValidatePin
  )
  .patch(
    '/forgot-password/reset',
    accept({ instance: 'body', fields: [ 'email', 'code', 'password' ] }),
    forgotPassword,
    Functions.patch({ customSuccessMessage: 'Senha alterada com sucesso' })
  )

export default Routes

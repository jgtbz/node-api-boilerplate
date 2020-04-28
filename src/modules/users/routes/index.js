import { Router } from 'express'

import Protector from '../../../app/Protector'

import { Controller } from '../support'
import { autoInject } from '../middleware'

const Routes = Router()

Routes
  .get(
    '/index',
    Controller.get()
  )
  .get(
    '/index/paginate',
    Controller.getWithPaginate()
  )
  .get(
    '/details/:id',
    Controller.getById()
  )
  .get(
    '/me',
    autoInject,
    Controller.getById()
  )
  .post(
    '/login',
    Protector.acceptBody(['email', 'password']),
    Controller.login()
  )
  .post(
    '/create',
    Protector.acceptBody(['name', 'email', 'password']),
    Controller.post({ customSuccessMessage: 'Cadastro realizado com sucesso' })
  )
  .patch(
    '/update/:id',
    Protector.acceptBody(['name', 'email']),
    Controller.patch({ customSuccessMessage: 'Dados atualizados com sucesso' })
  )
  .patch(
    '/me',
    autoInject,
    Protector.acceptBody(['name', 'email']),
    Controller.patch({ customSuccessMessage: 'Dados atualizados com sucesso' })
  )
  .patch(
    '/password',
    autoInject,
    Protector.acceptBody(['currentPassword', 'password', 'confirmPassword']),
    Controller.updatePassword({ customSuccessMessage: 'Senha alterada com sucesso' })
  )
  .patch(
    '/forgot-password/send-pin',
    Protector.acceptBody(['email']),
    Controller.forgotPasswordSendPin({ customSuccessMessage: 'Enviamos um código para o seu email' })
  )
  .patch(
    '/forgot-password/validate-pin',
    Protector.acceptBody(['email', 'code']),
    Controller.forgotPasswordValidatePin()
  )
  .patch(
    '/forgot-password/reset',
    Protector.acceptBody(['email', 'code', 'password']),
    Controller.forgotPasswordReset({ customSuccessMessage: 'Senha alterada com sucesso' })
  )
  .patch(
    '/activateDeactivate/:id',
    Controller.activateDeactivate()
  )
  .delete(
    '/softDelete/:id',
    Controller.softDelete()
  )

export default Routes

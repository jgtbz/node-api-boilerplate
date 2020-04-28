import login from './login'
import get from './get'
import getWithPaginate from './getWithPaginate'
import getById from './getById'
import post from './post'
import insertMany from './insertMany'
import patch from './patch'
import _delete from './delete'
import softDelete from './softDelete'
import activateDeactivate from './activateDeactivate'
import postArray from './postArray'
import patchArray from './patchArray'
import deleteArray from './deleteArray'
import softDeleteArray from './softDeleteArray'
import activateDeactivateArray from './activateDeactivateArray'
import updatePassword from './updatePassword'
import {
  forgotPasswordSendPin,
  forgotPasswordValidatePin,
  forgotPasswordReset
} from './forgotPassword'

const functions = {
  login,
  get,
  getWithPaginate,
  getById,
  post,
  insertMany,
  patch,
  delete: _delete,
  softDelete,
  activateDeactivate,
  postArray,
  patchArray,
  deleteArray,
  softDeleteArray,
  activateDeactivateArray,
  updatePassword,
  forgotPasswordSendPin,
  forgotPasswordValidatePin,
  forgotPasswordReset
}

export default (...params) => {
  const reducer = (acc, [ key, value ]) => ({ ...acc, [key]: value(...params) })

  return Object
    .entries(functions)
    .reduce(reducer, {})
}

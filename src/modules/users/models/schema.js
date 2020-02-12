import { emailValidator } from '../../../support/validations'
import { REQUIRED, INVALID } from '../../../support/validations/messages'

export default {
  name: {
    type: String,
    required: [true, REQUIRED],
    trim: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, REQUIRED],
    trim: true,
    index: true,
    validate: {
      validator: emailValidator,
      message: INVALID
    }
  },
  forgotPassword: {
    code: String,
    expiresIn: Date
  },
  password: {
    type: String,
    required: [true, REQUIRED],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  }
}

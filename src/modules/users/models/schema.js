import validators from '../validators'
import { messages } from '../../../support/validators'

export default {
  name: {
    type: String,
    required: [true, messages.REQUIRED],
    trim: true,
    index: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, messages.REQUIRED],
    trim: true,
    index: true,
    validate: validators.email
  },
  forgotPassword: {
    code: String,
    expiresIn: Date
  },
  password: {
    type: String,
    required: [true, messages.REQUIRED],
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active'
  }
}

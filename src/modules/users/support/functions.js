import Model from '../models/model'
import functions from '../../../functions'

const messageConfig = { single: 'Usuário', plural: 'Usuários', type: 'o' }

const FUNCTIONS = functions({ Schema: Model, messageConfig })

export { messageConfig }

export default FUNCTIONS

import Controller from '../../../app/MongoDBControllers'

import Model from '../models/model'

const messageConfig = { single: 'Usuário', plural: 'Usuários', type: 'o' }

export { messageConfig }

export default Controller({ Model, messageConfig })

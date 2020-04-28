const updateOptions = { runValidators: true, context: 'query' }

const unauthorizedModel = {
  status: 401,
  message: 'Acesso Negado'
}

const notFound = {
  status: 404,
  message: 'Nenhum resultado encontrado'
}

export {
  updateOptions,
  unauthorizedModel,
  notFound
}

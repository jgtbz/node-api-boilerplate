export const onGetSuccess = ({ plural, type }) => `${plural} carregad${type}s com sucesso`
export const onGetError = ({ plural }) => `Não foi possível carregar os ${plural}`
export const onGetByIdSuccess = ({ single, type }) => `${single} carregad${type} com sucesso`
export const onGetByIdError = ({ single, type }) => `Não foi possível carregar ${type} ${single}`
export const onPostSuccess = ({ single, type }) => `${single} cadastrad${type} com sucesso`
export const onPostError = ({ single, type }) => `Não foi possível cadastrar ${type} ${single}`
export const onPatchSuccess = ({ single, type }) => `${single} atualizad${type} com sucesso`
export const onPatchError = ({ single, type }) => `Não foi possível atualizar ${type} ${single}`
export const onDeleteSuccess = ({ single, type }) => `${single} excluíd${type} com sucesso`
export const onDeleteError = ({ single, type }) => `Não foi possível excluír ${type} ${single}`
export const onActivateDeactivateSuccess = () => `Situação atualizada com sucesso`
export const onActivateDeactivateError = () => `Não foi possível atualizar esta Situação`

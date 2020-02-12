const UNIQUE = 'Valor já utilizado'

const REQUIRED = 'Campo obrigatório'

const INVALID = 'Valor inválido'

const MINLENGTH = (min) => `Mínimo de ${min} caracteres`

const MAXLENGTH = (max) => `Máximo de ${max} caracteres`

export {
  REQUIRED,
  UNIQUE,
  INVALID,
  MINLENGTH,
  MAXLENGTH
}

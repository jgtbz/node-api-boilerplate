const validateNotRequired = (validator) => (value) => !value || validator(value)
const setUniqueNotRequired = (value) => value || null

export {
  validateNotRequired,
  setUniqueNotRequired
}

export default ({ status, message, customSuccessMessage, data = undefined, res = {} }) => {
  const response = {
    status,
    message: customSuccessMessage || message,
    data
  }

  res.response = response

  return response
}

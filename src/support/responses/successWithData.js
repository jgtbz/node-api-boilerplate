export default ({ status, message, data = {}, res }) => {
  const { docs, ...pagination } = data

  const response = {
    status,
    message,
    docs,
    pagination
  }

  res.response = response

  return response
}

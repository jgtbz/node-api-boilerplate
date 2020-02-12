export default (key, type = String) => (arr) => {
  const value = ({ $in: arr.split(',').map(type) })

  return {
    key,
    value
  }
}

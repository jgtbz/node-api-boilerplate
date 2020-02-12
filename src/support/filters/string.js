export default (key) => (str) => {
  const value = new RegExp(`^.*${str}.*$`, 'i')

  return {
    key,
    value
  }
}

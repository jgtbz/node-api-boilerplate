export default (key) => (value) => ({
  key,
  value: value === 'true'
})

import moment from 'moment'

export default (key) => (period) => {
  const [ start, end ] = period.split(',')

  const value = {
    $gt: moment(start).startOf('day').toDate(),
    $lt: moment(end).endOf('day').toDate()
  }

  return {
    key,
    value
  }
}

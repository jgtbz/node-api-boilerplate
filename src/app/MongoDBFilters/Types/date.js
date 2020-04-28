import moment from 'moment'

export default (key) => (period) => {
  const [ start, end = start ] = period.split(',')

  const value = {
    $gte: moment(start).toDate(),
    $lte: moment(end).toDate()
  }

  return {
    key,
    value
  }
}

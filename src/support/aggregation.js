import { concatMany } from './utils'
import { concat } from 'ramda'

const lookupVirtual = ({ from, field, prop = 'name' }) => ([
  { $lookup: {
    from,
    localField: field,
    foreignField: '_id',
    as: field
  }},
  { $unwind: concatMany('$', field) },
  { $addFields: {
    [field]: concatMany('$', field, '.', prop)
  }}
])

const formatToDate = ({ prop, format = '%d/%m/%Y', timezone = 'America/Sao_Paulo' }) => ({
  $addFields: {
    [prop]: { $dateToString: { format, date: concat('$', prop), timezone } }
  }
})

const textSeparateByCommas = ({ prop, input }) => ({
  $addFields: {
    [prop]: {
      $trim: {
        input: {
          $reduce: {
            input: concat('$', input),
            initialValue: '',
            in: { $concat: [ '$$value', ', ', concat('$$this.', prop) ] }
          }
        },
        chars: ', '
      }
    }
  }
})

const booleanVirtual = ({ prop, onTrue = 'Sim', onFalse = 'Não' }) => ({
  $addFields: {
    [prop]: { $cond: [ { $eq: [ concat('$', prop), true ] }, onTrue, onFalse ] }
  }
})

const statusVirtual = {
  $addFields: {
    status: {
      $switch: {
        branches: [
          { case: { $eq: [ '$status', 'active' ] }, then: 'Ativo' },
          { case: { $eq: [ '$status', 'inactive' ] }, then: 'Inativo' }
        ],
        default: 'Ativo'
      }
    }
  }
}

const count = {
  $group: {
    _id: null,
    count: { $sum: 1 }
  }
}

export {
  lookupVirtual,
  formatToDate,
  textSeparateByCommas,
  booleanVirtual,
  statusVirtual,
  count
}

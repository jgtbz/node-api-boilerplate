import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

export default (Schema) => Schema.plugin(aggregatePaginate)

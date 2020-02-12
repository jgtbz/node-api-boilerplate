import mongoose from 'mongoose'

import config from './config'

const options = { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }

export default async () => {
  try {
    const { mongoDB } = config
    await mongoose.connect(mongoDB, options)
    console.log(`Connected on MongoDB: ${mongoDB}.`)
  } catch ({ message }) {
    console.log({ err: message })
  }
}

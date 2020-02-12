import mongoose from 'mongoose'

export default async () => {
  await mongoose.connection.db.dropDatabase()
}

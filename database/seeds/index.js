import initDatabase from '../../src/initDatabase'

import dropDatabase from './_dropDatabase'

import { Faker } from './_faker'

import users from './users'

const seeds = async () => {
  await initDatabase()
  await dropDatabase()

  await users(Faker)

  process.exit()
}

seeds()

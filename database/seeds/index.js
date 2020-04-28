import initDatabase from '../../src/initDatabase'

import dropDatabase from './_dropDatabase'

import users from './users'

const seeds = async () => {
  await initDatabase()
  await dropDatabase()

  await users()

  process.exit()
}

seeds()

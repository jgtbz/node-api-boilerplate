import Model from '../../src/modules/users/models/model'
import AsyncForEach from '../../src/app/AsyncForEach'

import Faker from 'faker'

export default async () => {
  const data = []

  await AsyncForEach(Array.from({ length: 35 }), async () => {
    data.push({
      name: Faker.name.findName(),
      email: Faker.internet.email().toLowerCase(),
      password: '123456',
      status: 'active'
    })
  })

  await Model.create(data)
}

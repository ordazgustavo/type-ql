import { Connection } from 'typeorm'
import faker from 'faker'

import { testConn } from '../../test-utils/testConn'
import { gCall } from '../../test-utils/gCall'
import { User } from '../../entity/User'

let conn: Connection
beforeAll(async () => {
  jest.setTimeout(30000)
  conn = await testConn()
})

afterAll(async () => {
  await conn.close()
})

const registerMutation = `
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      id
      firstName
      lastName
      email
      fullName
    }
  }
`

describe('Register', () => {
  it('Create user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    }

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        data: user
      }
    })

    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })

    const dbUser = await User.findOne({ where: { email: user.email } })

    expect(dbUser).toBeDefined()
    expect(dbUser!.confirmed).toBeFalsy()
    expect(dbUser!.firstName).toBe(user.firstName)
  })
})

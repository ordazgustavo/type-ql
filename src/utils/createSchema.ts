import { buildSchema } from 'type-graphql'

export function createSchema() {
  return buildSchema({
    resolvers: [__dirname + '/../modules/{,!(__test__)}/*.ts'],
    authChecker: ({ context: { req } }) => {
      return Boolean(req.session.userId)
    }
  })
}

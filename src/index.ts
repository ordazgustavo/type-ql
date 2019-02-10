import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'

import { RegisterResolver } from './modules/user/Register'

async function main() {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  })

  const apolloServer = new ApolloServer({ schema })

  const app = Express()

  apolloServer.applyMiddleware({ app })

  const port = 4000
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`)
  })
}

main()

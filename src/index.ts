import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import Express from 'express'
import { buildSchema, formatArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'
import session from 'express-session'
import connectRedis from 'connect-redis'
import cors from 'cors'

import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import { MeResolver } from './modules/user/Me'
import { redis } from './redis'

async function main() {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [MeResolver, RegisterResolver, LoginResolver],
    authChecker: ({ context: { req } }) => {
      return Boolean(req.session.userId)
    }
  })

  const apolloServer = new ApolloServer({
    schema,
    formatError: formatArgumentValidationError,
    context: ({ req }: any) => ({ req })
  })

  const app = Express()

  const RedisStore = connectRedis(session)

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  )

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: 'sadkjfhjljhads',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  )

  apolloServer.applyMiddleware({ app })

  const port = 4000
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`)
  })
}

main()

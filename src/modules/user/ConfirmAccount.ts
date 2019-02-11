import { Resolver, Mutation, Arg } from 'type-graphql'

import { User } from '../../entity/User'
import { redis } from '../../redis'
import { confirmUserPrefix } from '../constants/redisPrefixes'

@Resolver()
export class ConfirmAccountResolver {
  @Mutation(() => Boolean)
  async confirmAccount(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token)

    if (!userId) {
      return false
    }

    await User.update({ id: Number(userId) }, { confirmed: true })
    await redis.del(token)

    return true
  }
}

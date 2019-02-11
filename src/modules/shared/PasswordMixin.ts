import { InputType, Field, ClassType } from 'type-graphql'
import { Min } from 'class-validator'

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @Min(6)
    password: string
  }
  return PasswordInput
}

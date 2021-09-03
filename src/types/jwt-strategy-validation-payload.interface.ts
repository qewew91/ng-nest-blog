import { User } from './user.interface'

export interface IJwtStrategyValidation {
  user: {
    user: User
  }
}
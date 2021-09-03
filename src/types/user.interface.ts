import { UserRoles } from './user-roles.enum'

export interface User {
  id?: number
  user?: number
  name?: string
  username?: string
  email?: string
  password?: string
  role?: UserRoles
}
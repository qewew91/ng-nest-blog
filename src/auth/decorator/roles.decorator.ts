import { SetMetadata } from '@nestjs/common'
import { UserRoles } from '../../types/user-roles.enum'

export const HasRoles = (...roles: UserRoles[]) => SetMetadata('roles', roles)

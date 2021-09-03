import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'
import { UserService } from '../../user/user.service'
import { IJwtStrategyValidation } from '../../types/jwt-strategy-validation-payload.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
              @Inject(forwardRef(() => UserService))
              private readonly userService: UserService) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())

    if (!roles) {
      return false
    }

    const request = context.switchToHttp().getRequest<IJwtStrategyValidation>()
    const user = request.user.user
    return this.userService.findOne(user.id).pipe(
      map((user) => {
        const hasRole = () => roles.indexOf(user.role) > -1
        let hasPermission = false

        if (hasRole()) {
          hasPermission = true
        }

        return user && hasPermission
      }),
    )
  }
}

import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { catchError, map, Observable, of } from 'rxjs'
import { UserService } from './user.service'
import { User } from '../types/user.interface'
import { LoginResponse } from '../types/login-response.interface'
import { HasRoles } from '../auth/decorator/roles.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { UserRoles } from '../types/user-roles.enum'
import { Pagination } from 'nestjs-typeorm-paginate'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError(err => of({ error: err.message })),
    )
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<LoginResponse> {
    return this.userService.login(user).pipe(
      map((jwt: string) => ({ access_token: jwt })),
    )
  }
  @HasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id)
  }

  @HasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  index(@Query('page') page = 1, @Query('limit') limit = 10): Observable<Pagination<User>> {
    limit = limit > 100 ? 100: limit
    return this.userService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/user'
    })
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.userService.deleteOne(id)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateOne(@Param('id') id: number, @Body() user: User) {
    return this.userService.updateOne(id, user)
  }

  // @HasRoles(UserRoles.ADMIN)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id/role')
  @HttpCode(HttpStatus.OK)
  updateUserRole(@Param('id') id: number, @Body() user: User): Observable<User> {
    return this.userService.updateUserRole(id, user)
  }
}

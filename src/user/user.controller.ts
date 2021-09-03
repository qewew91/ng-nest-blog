import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { catchError, map, Observable, of } from 'rxjs'
import { UserService } from './user.service'
import { User } from './models/user.interface'
import { LoginResponse } from '../types/login-response.interface'

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

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Observable<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Observable<User> {
    return this.userService.findOne(id)
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
}

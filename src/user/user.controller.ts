import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './models/user.interface'
import { Observable } from 'rxjs'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() user: User): Observable<User> {
    return this.userService.create(user)
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

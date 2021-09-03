import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs'
import { Repository } from 'typeorm'
import { UserEntity } from './models/user.entity'
import { User } from './models/user.interface'
import { AuthService } from '../auth/auth.service'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
              private readonly authService: AuthService) {
  }

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((hashedPassword: string) => {
        const newUser = new UserEntity(user.name, user.username, user.email, hashedPassword)

        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            const { password, ...result } = user
            return result
          }),
          catchError(err => throwError(err)),
        )
      }),
    )
  }

  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users: User[]) => {
        users.forEach(user => delete user.password)
        return users
      }),
    )
  }

  findOne(id: number): Observable<User> {
    return from(this.userRepository.findOne({ id })).pipe(
      map((user: User) => {
        const { password, ...result } = user
        return result
      }),
    )
  }

  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ email }))
  }

  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id))
  }

  updateOne(id: number, user: User): Observable<any> {
    delete user.email
    delete user.password
    return from(this.userRepository.update(id, user))
  }

  login(user: User): Observable<string> {
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService.generateJWT(user).pipe(
            map((jwt: string) => jwt),
          )
        } else {
          return 'Wrong Credentials'
        }
      }),
    )
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.findByMail(email).pipe(
      switchMap((user: User) => this.authService.comparePasswords(password, user.password).pipe(
        map((match: boolean) => {
          if (match) {
            const { password, ...result } = user
            return result
          } else {
            throw Error()
          }
        }),
      )),
    )
  }


}

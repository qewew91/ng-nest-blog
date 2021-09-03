import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { from, Observable } from 'rxjs'
import { hash, compare } from 'bcrypt'
import { User } from '../user/models/user.interface'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  generateJWT(user: User): Observable<string> {
    return from(this.jwtService.signAsync({ user }))
  }

  hashPassword(password: string): Observable<string> {
    return from(hash(password, 12))
  }

  comparePasswords(newPassword: string, hashedPassword): Observable<any | boolean> {
    return from<any | boolean>(compare(newPassword, hashedPassword))
  }

}
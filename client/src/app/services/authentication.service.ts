import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoginToken } from '../../types/server-types'
import { LoginForm } from '../../types/form-types'
import { User } from '../../types'


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(loginForm: LoginForm): Observable<LoginToken> {
    return this.http.post<LoginToken>('/api/user/login', { email: loginForm.email, password: loginForm.password }).pipe(
      map((token: LoginToken) => {
        localStorage.setItem('blog-token', token.access_token)
        return token
      }),
    )
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/user/', user).pipe(
      map(user => user),
    )
  }
}

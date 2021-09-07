import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LoginToken } from '../../types/server-types/login-token.type'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<LoginToken> {
    return this.http.post<any>('/api/user/login', {email, password}).pipe(
      map((token: LoginToken) => {
        localStorage.setItem('blog-token', token.access_token)
        return token
      })
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from './interfaces';
import { Observable, tap } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    //public jwtService: JwtHelperService
  ) { }

  /*
   Due to the '/api' the url will be rewritten by the proxy, e.g. to http://localhost:8080/api/auth/login
   this is specified in the src/proxy.conf.json
   the proxy.conf.json listens for /api and changes the target. You can also change this in the proxy.conf.json

   The `..of()..` can be removed if you have a real backend, at the moment, this is just a faked response
  */
  login(loginRequest: LoginRequest, url:string): Observable<LoginResponse> {
    // return of(fakeLoginResponse).pipe(
    //   tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
    // );

    // return this.http.post<LoginResponse>('/authentication/login', loginRequest).pipe(
    // tap((res: LoginResponse) => localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.accessToken)),
    // );
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY)
    return this.http.post<LoginResponse>(url, loginRequest).pipe(
    tap((res: LoginResponse) => {
      console.log("tap");
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, res.username);
      localStorage.setItem(LOCALSTORAGE_TYPE_KEY, res.type);
      //console.log(localStorage.getItem(LOCALSTORAGE_TOKEN_KEY));
    })
    );
  }

  register(user: User, url:string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(url, user);
  }

  /*
   Get the user fromt the token payload
   */
  getUserName() {
    return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  }

  getUserType(){
    return localStorage.getItem(LOCALSTORAGE_TYPE_KEY)
  }

  logout(){
    localStorage.clear();
  }
}

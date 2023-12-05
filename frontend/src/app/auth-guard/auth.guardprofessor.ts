import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LOCALSTORAGE_TOKEN_KEY, LOCALSTORAGE_TYPE_KEY } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardProf  implements CanActivate{

  constructor(
    //private router: Router,
    //private jwtService: JwtHelperService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // isTokenExpired() will return true, if either:
    // - token is expired
    // - no token or key/value pair in localStorage
    // - ... (since the backend should validate the token, even if there is another false token, 
    //       then he can access the frontend route, but will not get any data from the backend)
    // --> then redirect to the base route and deny the routing
    // --> else return true and allow the routing
    //if (this.jwtService.isTokenExpired()) {
      return true;
    if (localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) === null || localStorage.getItem(LOCALSTORAGE_TYPE_KEY)==='student') {
      //this.router.navigate(['']);
      return false;
    } else {
      return true;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
@Injectable()

export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // we have 2 Observables but the method should return only 1
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap( (user) => {
        // if(!user) {
        //   return next.handle(req);
        // }
        // we need to enable initial login/signup
        if(
          req.url === 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoY91CIMZ_7dSVnUPAsO8PAMhmik7mJtM' ||
          req.url === 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBoY91CIMZ_7dSVnUPAsO8PAMhmik7mJtM') {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq)
      })
    )
  }
}

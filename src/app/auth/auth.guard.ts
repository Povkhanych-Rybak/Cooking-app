import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    // should check if a user is authinticated . Not subscribe to a subj as it is an Observable,
    return this.authService.user.pipe(
      // take(1) to avoid ongoing uer subscription
      take(1),
      map( (user) => {
      // converting truish/falsish values to boolean
      const isAuth = !!user;
      if(isAuth){
        return true;
      } else {
        return this.router.createUrlTree(['/auth'])
      }
    }));
  }
}

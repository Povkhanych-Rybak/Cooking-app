import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken:	string,
  email:	string,
  refreshToken: string,
  expiresIn:	string,
  localId:	string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
// to store an authinticated User and have access to the value which was emitted bofore we subscribed
  user =  new BehaviorSubject<User>(null);
  apiKey: string = 'AIzaSyBoY91CIMZ_7dSVnUPAsO8PAMhmik7mJtM';
  tokenExpirationTimer: any;


  constructor(
    private http: HttpClient,
    private router: Router) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      // if we don't have error in response we have a token&expDate
      tap( (resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    )

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError),
      tap( (resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    )
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    } else {
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      // using getter (get token)- checks for the expDate
      if(loadedUser.token) {
        // using BehaviorSubject we created
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }
  // logout will contain redirect as we will use logout in a few places
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    // clear localStorage to prevent autoLogin()
    localStorage.removeItem('userData');
    // clear timer as the token expires byDefault if we manually logout
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    } else {
      this.tokenExpirationTimer = null;
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout( () => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    // converting s to ms
    this.autoLogout(expiresIn*1000)
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if(!errorRes.error || !errorRes.error.error ) {
      return throwError(errorMessage);
    }
    //errorMessage = errorRes.error.error.message;
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email already exists.";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "There here is no user record corresponding to this email.";
      case 'INVALID_PASSWORD':
        errorMessage = "You've entered an invalid password.";
        break;
      case 'USER_DISABLED':
        errorMessage = "The user account has been disabled by an administrator.";
        break;
    }
    return throwError(errorMessage);
  }

}

//throwError returns an Observable

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  idToken:	string,
  email:	string,
  refreshToken: string,
  expiresIn:	string,
  localId:	string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {
  apiKey: string = 'AIzaSyBoY91CIMZ_7dSVnUPAsO8PAMhmik7mJtM';

  constructor(
    private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError)
    )

  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError)
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error ) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "This email already exists.";
    }
    return throwError(errorMessage);
  }
}

//throwError returns an Observable

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode =  true;
  isLoading = false;
  error:string = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  // to check if we're in login or sign up mode


  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode) {
      // no subscribe as we store the method depending on the mode
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      // we receive only errorMessage but not a whole error reponse as we adjust it in a service via rxjs
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }
}

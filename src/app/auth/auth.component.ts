import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate }  from '@angular/animations';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('auth-block', [
      state('start', style( {
        background: '#faa8209e',
        padding: '3%',
        marginLeft: '0',
        opacity: '0',
      })),
      state('end', style( {
        background: 'white',
        padding: '0',
        marginLeft: '25%',
        opacity: '1'
      })),
      transition('start => end', animate(600))
    ])
  ]
})
export class AuthComponent implements OnInit {
  isLoginMode =  true;
  isLoading = false;
  error:string = null;
  //animation property
  authBlockState = 'start';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animate();
  }
  // to check if we're in login or sign up mode

  animate() {
    setTimeout(() => {
      this.authBlockState = this.authBlockState === 'start' ? 'end' : 'start';
    }, 300);
  }

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

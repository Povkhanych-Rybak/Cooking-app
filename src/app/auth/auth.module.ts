import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthComponent } from './auth.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [AuthComponent],
  providers: [],
})
export class AuthModule {}

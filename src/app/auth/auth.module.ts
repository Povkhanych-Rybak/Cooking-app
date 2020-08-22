import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
//import { AuthService } from './auth.service';

const routes: Routes = [
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  declarations: [AuthComponent,
    //AuthService
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule ],
  exports: [AuthComponent],
  providers: [],
})
export class AuthModule {}

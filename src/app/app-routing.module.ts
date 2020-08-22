import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // recipes routing section moved to another module
  // shopping-list routing section moved to another module
  // auth was moved

];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  //exports: [RouterModule]
})
export class AppRoutingModule { }

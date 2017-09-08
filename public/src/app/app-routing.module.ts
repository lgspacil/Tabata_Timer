import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentComponent } from "app/parent/parent.component";
import { LoginComponent } from "app/login/login.component";

const routes: Routes = [
  // {path: '', component: ParentComponent},
  {path: '', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

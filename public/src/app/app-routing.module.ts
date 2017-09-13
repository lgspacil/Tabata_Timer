import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentComponent } from "app/parent/parent.component";
import { LoginComponent } from "app/login/login.component";
import { ResultsComponent } from "app/results/results.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: '', component: ParentComponent},
  {path: 'results', component: ResultsComponent},
  {path: 'home', component: ParentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

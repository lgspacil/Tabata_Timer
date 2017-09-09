import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParentComponent } from "app/parent/parent.component";
import { LoginComponent } from "app/login/login.component";
import { ResultsComponent } from "app/results/results.component";

const routes: Routes = [
  {path: 'parent', component: ParentComponent},
  {path: '', component: LoginComponent},
  {path: 'results', component: ResultsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

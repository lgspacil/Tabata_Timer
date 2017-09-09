import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ParentComponent } from './parent/parent.component';
import { TimerComponent } from "app/parent/timer/timer.component";
import { LoginComponent } from './login/login.component';
import { CookieService } from 'angular2-cookie/services/cookies.service'
import { HttpService } from "app/http.service";
import { ResultsComponent } from './results/results.component';




@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ParentComponent,
    LoginComponent,
    ResultsComponent,
    
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CookieService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

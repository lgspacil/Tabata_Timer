import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ParentComponent } from './parent/parent.component';
import { TimerComponent } from "app/parent/timer/timer.component";
import { DetailsComponent } from "app/parent/details/details.component";

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    DetailsComponent,
    ParentComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

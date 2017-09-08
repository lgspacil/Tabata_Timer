import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { }

   registerUser(registerObj){
   return this._http.post("/add_user", registerObj).map(data => data.json()).toPromise()
  }

  

}

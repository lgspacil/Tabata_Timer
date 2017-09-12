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

  userLogin(loginObj){
    return this._http.post("/login", loginObj).map(data => data.json()).toPromise()
  }

  workoutInput(workoutObj){
    return this._http.post('/inputWorkout', workoutObj).map(data => data.json()).toPromise()
  }

  loadAllWorouts(user_id){
    return this._http.post('/loadAllWorkouts', {_user: user_id}).map(data => data.json()).toPromise()
  }

  loadUserInfo(user_id){
    return this._http.post('/loadUserInfo', {_user: user_id}).map(data => data.json()).toPromise()
  }

  changeWeight(newWeight){
    return this._http.post('/changeWeight', newWeight).map(data => data.json()).toPromise()
  }
  

}

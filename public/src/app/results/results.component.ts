import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  //user info stored in the cookie:
  name = this._cookieService.get('name');
  user_id = this._cookieService.get('user_id');

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loadAllWorkouts();

  }

  loadAllWorkouts(){
    this._httpService.loadAllWorouts(this.user_id)

    .then((data) =>{
      console.log("the workouts I got back are: ", data)
    })
    .catch((err) =>{
      console.log(err);
      
    })
  }

}

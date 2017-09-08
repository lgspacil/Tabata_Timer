import { Component, OnInit } from '@angular/core';
import { HttpService } from "app/http.service";
import { Router } from '@angular/router';
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _cookieService:CookieService, private _router: Router, private _httpService:HttpService) { }

  loginObj = {
    email:'',
    name:'',
    password:''
  }

  registerObj = {
    email:'',
    name:'',
    password:'',
    weight:''
  }

  errors = '';

  ngOnInit() {
  }

  loginSubmit(){
    console.log("loginSubmitted")



  }

  registerUser(){
    this._httpService.registerUser(this.registerObj)

    .then((data) =>{
      console.log("back in the register.ts with the data: ", data)
      if(data==false){
        this.errors = "you already registered with this email";
      }
      else{
        console.log("success posted to the DB: now adding to our cookies");
        this._cookieService.put('name', data.name);
        this._cookieService.put('user_id', data._id);

        // this._router.navigate(['/create_continue']);
      }
    })
    .catch((err) =>{
      console.log("in the register.ts but had an error")
    })
  }
  

}

import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { HttpService } from "app/http.service";
import { Router } from '@angular/router';
import { CookieService } from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('closeLogin') closeLogin:ElementRef
  @ViewChild('closeRegister') closeRegister:ElementRef

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

        this.closeRegister.nativeElement.click();

        this._router.navigate(['/parent']);
      }
    })
    .catch((err) =>{
      console.log("in the register.ts but had an error")
    })
  }

  userLogin(){
    console.log("user clicked me to login")
    this._httpService.userLogin(this.loginObj)

    .then((data)=>{
      console.log("data in the login.ts we got back is: ", data)
      if (data == null){
        this.errors = "You have to register if this is your first time here"
      }
      else{
        if(this.loginObj.password == data.password){
            console.log("success for logging in! ", data);
            this._cookieService.put('name', data.name);
            this._cookieService.put('user_id', data._id);

            this.closeLogin.nativeElement.click();

            this._router.navigate(['/parent']);
        }else{
          this.errors = "Wrong Password!"
        }
      }
    })
    .catch((err) =>{
      console.log("got an error when trying to login");
      
    })
  }
  

}

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
    password:''
  }

  registerObj = {
    email:'',
    name:'',
    password:'',
    weight:Number,
    target_weight:Number,
    date_weight: ''
  }

  //login register variables
  errors = '';



  ngOnInit() {
  }


  registerUser(){
    //finding the exact date that you registered on and adding it to the registerOBJ to be recorded
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    
    let newdate = year + "/" + month + "/" + day;
    //populating the registerObj with todays date as a String
    this.registerObj.date_weight = newdate;

    this._httpService.registerUser(this.registerObj)

    .then((data) =>{
      console.log("back in the register.ts with the data: ", data)
      if(data==false){
        this.errors = "you already registered with this email";
      }
      else{
        //if you have a success being a new user we create cookies to hold our info
        console.log("success posted to the DB: now adding to our cookies");
        this._cookieService.put('name', data.name);
        this._cookieService.put('user_id', data._id);
        
        //closes the register modal
        this.closeRegister.nativeElement.click();
        
        this._router.navigate(['/home']);
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

            this._router.navigate(['/home']);
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

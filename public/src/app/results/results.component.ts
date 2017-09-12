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

  workout_list = [];

  weight_history = [];

  newWeight = {
    user_id: this.user_id,
    weightChange: null,
    date_weight:null
  }

  errors = "";

  load_chart = false;

///////////////////
//graph info///////
///////////////////
type = 'line';
data = {
  labels: [],
  datasets: [
    {
      label: "Weight Chart",
      data: [],
      backgroundColor: [
          'rgba(48, 161, 220, 0.2)',
      ],
      borderColor: [
        'rgba(31,65,120,1)',
      ]
    }
  ]
};
options = {
  responsive: true,
  maintainAspectRatio: false
};

//////////////////////////
//end of graph info///////
/////////////////////////

  constructor(private _httpService: HttpService, private _cookieService:CookieService, private _router: Router, private _route: ActivatedRoute) { }


  ngOnInit() {
    this.loadAllWorkouts();
    this.loadUserInfo();

  }

  loadAllWorkouts(){
    this._httpService.loadAllWorouts(this.user_id)

    .then((data) =>{
      console.log("the workouts I got back are: ", data)
  
      for(let i = 0; i < data.length; i++){
        if(data[i].total_time < 60){
          data[i].total_time = String(data[i].total_time)
        }else if(data[i].total_time >= 60){
          if(data[i].total_time%60 < 10){
            data[i].total_time = String(Math.floor(data[i].total_time/60)) + ":0" + String(data[i].total_time%60)
          }else{
            data[i].total_time = String(Math.floor(data[i].total_time/60)) + ":" + String(data[i].total_time%60)
          }
        }
      }
      this.workout_list = data;
      
    })
    .catch((err) =>{
      console.log(err);
      
    })
  }

  loadUserInfo(){
    this._httpService.loadUserInfo(this.user_id)

    .then((data) =>{
      console.log("the users data is: ", data)
      this.weight_history = data.weight;
      this.data.datasets[0].data = data.weight;
      this.data.labels = data.date_weight;

      console.log("the data the chart gets is:, ", this.data.datasets[0].data, " and: ", this.data.labels)
      this.load_chart = true;
    })

    .catch((err) =>{
      console.log(err);
      
    })
  }

  changeWeight(){
    this.load_chart = false;
    console.log("changeWeight loaded");
    
    if(this.newWeight.weightChange == null){
      this.errors = "you need to add a new weight"
    }else{
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();
      
      let newdate = year + "/" + month + "/" + day;
      
      this.newWeight.date_weight = newdate;
  
      this._httpService.changeWeight(this.newWeight)
  
      .then((data) =>{
        console.log("the data after chaning the weight is:", data)
        this.weight_history = data.weight;
        this.data.datasets[0].data = data.weight;
        this.data.labels = data.date_weight;

        this.load_chart = true;
        
  
      })
      .catch((err) =>{
        console.log(err);
        this.load_chart = true;
        
      })
    }
  
    
  }

}

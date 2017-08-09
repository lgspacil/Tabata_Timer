import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor() { }

  work = 20; //the amount of time you workout
  rest = 10; //the amount of time you rest
  cycles = 4; //the rounds you do on each workout
  tabatas = 8; // different workouts
  prepare = 20;

  //the original seconds of work the user typed in;
  original_work: number;
  original_cycles: number;
  original_rest: number;
  original_tabatas: number;

  //checks to see if the pause button was pushed
  running = false;

  //creating a global variable so to call it and stop the setInterval function
  interval;

  //the words that are described above
  action = "Work!"

  //show the form?
  show_form = true;

  //time to rest?
  time_to_rest = true;

  //prepare next boolean
  prepare_next_bool = false;

  //screen colors
  prepare_screen;
  rest_screen;
  work_screen;

  
  ngOnInit() {
  }

  tabataForm(){
    this.original_work = this.work;
    this.original_cycles = this.cycles;
    this.original_rest = this.rest;
    this.original_tabatas = this.tabatas;
    this.show_form = false;
  }


  startPause(){
    if(this.running == false){
      this.running = true;
      this.decrement();

    }else{
      this.running = false;
      clearInterval(this.interval);
    }
    
  }

  decrement(){
    this.interval = setInterval(()=> {
        this.timer(); },200); 
  }

  timer(){
    this.work -= 1;
    

    //when you run down your work... get rest!
    if(this.work == 0 && this.cycles > 1 && this.tabatas > 1 && this.prepare_next_bool == false){
      if(this.time_to_rest == true){
        this.action = "Rest!";
        this.work = this.original_rest;
        //setting the time_to_rest to false after you took the rest
        this.time_to_rest = false;

        //screen colors toggle
        this.rest_screen = true;
        this.work_screen = false;
        this.prepare_screen = false;

      //working when you did not have to rest
      }else{
        this.action = "Work!";
        this.work = this.original_work;
        //setting the time to rest to be true after you finsihed work
        this.time_to_rest = true;
        this.cycles -= 1;

        //screen colors toggle
        this.work_screen = true;
        this.rest_screen = false;
        this.prepare_screen = false;
      }
    }

    //if finished work, have only one cycle remaining (meanining you did that cycle)
    if(this.work == 0 && this.cycles == 1 && this.tabatas > 1 && this.prepare_next_bool == false){
      this.work = this.prepare;
      this.action = "Prepare for next Tabata!"
      this.tabatas -= 1;
      this.prepare_next_bool = true;
      this.cycles = 0;
      this.time_to_rest = true;

      //screen colors toggle
      this.work_screen = false;
      this.rest_screen = false;
      this.prepare_screen = true;
    }

    //after the prepare for next tabata screen I want to repopulate the cycles, 
    //this is the first work cycles that will be hit...
    if(this.work == 0 && this.prepare_next_bool == true){
      console.log("I am here");
      this.action = "Work!"
      this.cycles = this.original_cycles;
      this.work = this.original_work;
      this.prepare_next_bool = false;

      //screen colors toggle
      this.work_screen = true;
      this.rest_screen = false;
      this.prepare_screen = false;
    }


  }
}

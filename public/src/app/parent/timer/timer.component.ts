import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() original;
  @Input() numbers;

  constructor(private _router: Router) { }

  someProperty = true;

  //checks to see if the pause button was pushed
  running = false;

  //creating a global variable so to call it and stop the setInterval function
  interval;

  //the words that are described above
  action = "Work!"

  //time to rest?
  time_to_rest = true;

  //prepare next boolean
  prepare_next_bool = false;

  //screen colors
  prepare_screen = false;
  rest_screen = false;
  work_screen = true;

  //if true timer appears, if false details appear
  show_timer;

  //total time
  total_time = 1;
  shown_total_time;

  //audio stuff
  playing = false;
  audio_axwell = new Audio();
  audio_rest = new Audio();
  audio_work = new Audio();
  audio_starting_session = new Audio();
  audio_stopping_session = new Audio();
  audio_session_complete = new Audio();
  // audio.src = "http://remote.address.com/example.mp3";
  // audio.load();
  // audio.play();

  
  ngOnInit() {
    // console.log("received this from the input!", this.original)
    this.audio_axwell.src = "../assets/audio/axwell.mp3"
    this.audio_rest.src = "../assets/audio/rest.wav"
    this.audio_work.src = "../assets/audio/work.wav"
    this.audio_starting_session.src = "../assets/audio/starting_session.wav"
    this.audio_stopping_session.src = "../assets/audio/stopping_session.wav"
    this.audio_session_complete.src = "../assets/audio/session_complete.wav"

    this.audio_axwell.load();
    this.audio_rest.load();
    this.audio_work.load();
    this.audio_stopping_session.load();
    this.audio_starting_session.load();
    this.audio_session_complete.load();

  }



  startPause(){
    if(this.running == false){
      this.running = true;
      this.audio_starting_session.play();
      this.audio_axwell.play();
      this.playing = true;
      this.decrement();

    }else{
      this.running = false;
      this.audio_stopping_session.play();
      clearInterval(this.interval);
    }
    
  }

  decrement(){
    this.interval = setInterval(()=> {
        this.timer(); },200); 
  }

  timer(){
    this.numbers.work -= 1;
    this.total_time += 1;

    if(this.total_time < 60){
      this.shown_total_time = String(this.total_time);
    }else if(this.total_time >= 60){
      if(this.total_time%60<10){
        this.shown_total_time = String(Math.floor(this.total_time/60)) + ":0"+ String(this.total_time%60);
      }else{
        this.shown_total_time = String(Math.floor(this.total_time/60)) + ":"+ String(this.total_time%60);
      }
    }
    

    //when you run down your work... get rest!
    if(this.numbers.work == 0 && this.numbers.cycles > 1 && this.numbers.tabatas >= 1 && this.prepare_next_bool == false){
      if(this.time_to_rest == true){
        this.action = "Rest!";
        this.audio_rest.play();
        this.numbers.work = this.original.original_rest;
        //setting the time_to_rest to false after you took the rest
        this.time_to_rest = false;

        //screen colors toggle
        this.rest_screen = true;
        this.work_screen = false;
        this.prepare_screen = false;

      //working when you did not have to rest
      }else{
        this.action = "Work!";
        this.audio_work.play();
        this.numbers.work = this.original.original_work;
        //setting the time to rest to be true after you finsihed work
        this.time_to_rest = true;
        this.numbers.cycles -= 1;

        //screen colors toggle
        this.work_screen = true;
        this.rest_screen = false;
        this.prepare_screen = false;
      }
    }

    //if finished work, have only one cycle remaining (meanining you did that cycle)
    if(this.numbers.work == 0 && this.numbers.cycles == 1 && this.numbers.tabatas >= 1 && this.prepare_next_bool == false){
      this.numbers.work = this.numbers.prepare;
      this.action = "Prepare for next Tabata!"
      this.numbers.tabatas -= 1;
      this.prepare_next_bool = true;
      this.numbers.cycles = 0;
      this.time_to_rest = true;

      if(this.numbers.tabatas == 0){
        this.action = "Cool Down Time"
      }

      //screen colors toggle
      this.work_screen = false;
      this.rest_screen = false;
      this.prepare_screen = true;
    }

    //after the prepare for next tabata screen I want to repopulate the cycles, 
    //this is the first work cycles that will be hit...
    if(this.numbers.work == 0 && this.prepare_next_bool == true && this.numbers.cycles == 0 && this.numbers.tabatas >= 1){
      this.action = "Work!"
      this.audio_work.play();
      this.numbers.cycles = this.original.original_cycles;
      this.numbers.work = this.original.original_work;
      this.prepare_next_bool = false;

      //screen colors toggle
      this.work_screen = true;
      this.rest_screen = false;
      this.prepare_screen = false;
    }


    //finsihed tabata!
    if (this.numbers.work == 0 && this.numbers.cycles == 0 && this.numbers.tabatas == 0){
      this.action = "Session Complete!"
      this.audio_session_complete.play();
      this.running = false;
      clearInterval(this.interval);
    }
  }

  back(){
    this._router.navigate(['/back']);
  }

  stop_audio(){
    if(this.playing == true){
      this.audio_axwell.pause();
      this.playing = false;
    }else{
      this.audio_axwell.play();
      this.playing = true;
    }
  }
}

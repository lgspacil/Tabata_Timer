import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';


@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  // user info stored in the cookie:
  name = this._cookieService.get('name');
  user_id = this._cookieService.get('user_id');

  constructor(private _cookieService:CookieService) { }

  form_info = {
    work: 20,
    rest: 10,
    cycles: 4,
    tabatas: 5,
    prepare: 20
  }

  // the original seconds of work the user typed in;
  original_nums = {
    original_work: null,
    original_cycles: null,
    original_rest: null,
    original_tabatas: null,

  }


  // if show_timer is true we will show the timer page and hide the form
  show_timer = false;

  ngOnInit() {
  }

  tabataForm() {
    this.original_nums.original_work = this.form_info.work;
    this.original_nums.original_cycles = this.form_info.cycles;
    this.original_nums.original_rest = this.form_info.rest;
    this.original_nums.original_tabatas = this.form_info.tabatas;
    this.show_timer = true;
  }

  backButtonClicked(event) {
    this.show_timer = false;
  }

}

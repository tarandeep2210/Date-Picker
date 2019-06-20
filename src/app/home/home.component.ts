import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  
  selectedDate: any;
  showDatePicker: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(){
      this.showDatePicker = !this.showDatePicker;
  }

  setSelectedDate(date){
    this.selectedDate = moment(date).format('DD/MM/YYYY');
    this.toggle();
  }

}

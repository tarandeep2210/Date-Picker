import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Output() emitSelectedDate = new EventEmitter<any>();

  localeString: string = 'en';
  currentDate: any;
  selectedDate: any;
  headerArr: Array<string> = [];
  gridArr: Array<any> = [];

  constructor() { }

  ngOnInit() {
    moment.locale(this.localeString);
    this.currentDate = moment();
    this.createHeader();
    this.createGrid();  
  }

  modifyCurrentMonth(num : number){
    this.currentDate.add(num, 'month');
    this.createGrid();
  }

  createHeader(){
    for(let i =0 ; i<=6;i++){
      this.headerArr.push(moment().weekday(i).format('ddd'));
    }
  }

  createGrid(){
    this.gridArr = [];

    const firstDayDate = moment(this.currentDate).startOf('month');
    console.log(firstDayDate.weekday());
    const initialEmptyCells = firstDayDate.weekday();
    const lastDayDate = moment(this.currentDate).endOf('month');
    console.log(lastDayDate.weekday());
    const lastEmptyCells = 6 - lastDayDate.weekday();
    const daysInMonth = this.currentDate.daysInMonth();
    const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

      for(let i = 0; i < arrayLength; i++){
        let obj: any = {};
          if(i < initialEmptyCells || i > initialEmptyCells + daysInMonth -1){
            obj.value = 0;
            obj.available = false;
          }
          else {
            obj.value = i - initialEmptyCells +1;
          }
        this.gridArr.push(obj);
      }
    }


    dateFromNum(num: number, referenceDate: any): any{
        let returnDate = moment(referenceDate);
        return returnDate.date(num);
    }

    selectDay(day: any){
      
        this.selectedDate = this.dateFromNum(day.value, this.currentDate);
        console.log(this.selectedDate.date());
        this.emitSelectedDate.emit(this.selectedDate);
      
    }

}

import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationListDataService {

  date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  constructor() {
  }

  changeMonth(num: number) {
    const value = this.date.value.add(num, 'month');
    this.date.next(value);
  }

  changeDay(date) {
    const value = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(value);
  }
}

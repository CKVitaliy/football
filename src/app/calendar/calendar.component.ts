import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {ReservationListDataService} from '../share/reservation-list-data.service';

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

interface Week {
  days: Day[];
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  constructor(private reservationListDataService: ReservationListDataService) { }

  ngOnInit() {
    this.reservationListDataService.date.subscribe(this.generate.bind(this));
  }

  generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const beginCycleDay = startDay.clone().subtract(1, 'day');
    const endDay = now.clone().endOf('month').endOf('week');
    const calendar = [];
    while (beginCycleDay.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = beginCycleDay.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            return {
              value, active, disabled, selected
            };
          })
      });
    }
    this.calendar = calendar;
  }

  selectDay(day: moment.Moment) {
    this.reservationListDataService.changeDay(day);
  }

}

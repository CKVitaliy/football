import { Component } from '@angular/core';
import {ReservationListDataService} from '../share/reservation-list-data.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  constructor(private reservationListDataService: ReservationListDataService) { }

  changeMonth(num: number) {
    this.reservationListDataService.changeMonth(num);
  }

}

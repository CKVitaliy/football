import {Component, Input, OnInit} from '@angular/core';
import {ReservationListDataService} from '../share/reservation-list-data.service';
import {FormBuilder, Validators} from '@angular/forms';
import * as moment from 'moment';
import {SubmitService} from '../share/submit.service';
import {Stadium} from '../reservation/reservation.component';
import {Router} from '@angular/router';

export interface Time {
  time: string;
  status: string;
  team: string;
  name: string;
  phone: string;
}

export interface ReservationData {
  date: string;
  stadium: string;
  dataArray: Time[];
}

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  @Input() stadiums;
  dataArray: Time[];
  selectStadiumForm;
  selectedDate;
  selectedStadium: Stadium;
  getReservationDataUrl = 'http://localhost:3000/users/getReservationData';
  showSpinner = false;
  showDataArrayError = '';

  constructor(
    private reservationListDataService: ReservationListDataService,
    private fb: FormBuilder,
    private submitService: SubmitService,
    private router: Router) {
  }

  ngOnInit() {
    this.selectStadiumForm = this.fb.group({
      selectedStadiumName: [this.stadiums[0].name, Validators.required]
    });
    this.reservationListDataService.date.subscribe(this.onChangeDate.bind(this));
  }

  onChangeDate(chosenDate: moment.Moment) {
    this.showDataArrayError = '';
    this.dataArray = [];
    this.showSpinner = true;
    this.selectedDate = chosenDate;
    this.selectedStadium = this.stadiums.find(el => el.name === this.selectStadiumForm.get('selectedStadiumName').value);
    const data = {
      date: chosenDate.format('DD.MM.YYYY'),
      stadium: this.selectedStadium._id
    };
    this.submitService.postData(this.getReservationDataUrl, data).subscribe(
      (res: ReservationData) => {
        this.showSpinner = false;
        this.dataArray = res.dataArray;
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.showDataArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

  goToReserveTimeComponent(el) {
    if (el.status === 'Free') {
      this.router.navigate(['/reserveTime', {
        date: this.selectedDate.format('DD.MM.YYYY'),
        stadium_id: this.selectedStadium._id,
        stadiumName: this.selectedStadium.name,
        time: el.time
      }]);
    }
  }

}

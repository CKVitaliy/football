import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {SubmitService} from '../share/submit.service';
import {ReservationData} from '../reservation-list/reservation-list.component';

@Component({
  selector: 'app-reserve-time',
  templateUrl: './reserve-time.component.html',
  styleUrls: ['./reserve-time.component.css']
})
export class ReserveTimeComponent implements OnInit {
  date;
  stadiumId;
  stadiumName;
  time;
  reservationForm;
  getReservationDataUrl = 'http://localhost:3000/users/getReservationData';
  disableButton = false;
  showSpinner = false;
  showDataArrayError = '';
  postReservationDataUrl = 'http://localhost:3000/users/postReservationData';
  successReserved = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private submitService: SubmitService
  ) {
  }

  ngOnInit() {
    this.date = this.route.snapshot.paramMap.get('date');
    this.stadiumId = this.route.snapshot.paramMap.get('stadium_id');
    this.stadiumName = this.route.snapshot.paramMap.get('stadiumName');
    this.time = this.route.snapshot.paramMap.get('time');
    this.reservationForm = this.fb.group({
      team: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      lookingOpponent: [false]
    });
  }

  onlyNumber(event) {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

  reserve() {
    this.disableButton = true;
    this.clearReservedDate();
    this.successReserved = false;
    this.showSpinner = true;
    const data = {
      date: this.date,
      stadium: this.stadiumId
    };
    this.submitService.postData(this.getReservationDataUrl, data).subscribe(
      (res: ReservationData) => {
        const timeObject = res.dataArray.find(el => el.time === this.time);
        if (timeObject.status === 'Free') {
          timeObject.status = this.reservationForm.get('lookingOpponent').value ? 'Looking for an opponent' : 'Reserved';
          timeObject.team = this.reservationForm.get('team').value;
          timeObject.name = this.reservationForm.get('name').value;
          timeObject.phone = this.reservationForm.get('phone').value;
          const newData: ReservationData = {
            date: this.date,
            stadium: this.stadiumId,
            dataArray: res.dataArray
          };
          this.submitService.postData(this.postReservationDataUrl, newData).subscribe(
            () => {
              this.showSpinner = false;
              this.successReserved = true;
            },
            err => {
              console.log(err);
              this.disableButton = false;
              this.showSpinner = false;
              this.showDataArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
            }
          );
        } else {
          this.showSpinner = false;
          this.successReserved = false;
          this.showDataArrayError = 'This time is already reserved';
        }
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.disableButton = false;
        this.showDataArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

  clearReservedDate() {
    this.showDataArrayError = '';
  }

}

import { Component, OnInit } from '@angular/core';
import {SubmitService} from '../share/submit.service';

export interface Stadium {
  _id: string;
  name: string;
  address: string;
  phone: string;
  image: string;
}

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  stadiums: Stadium[];
  getStadiumUrl = 'http://localhost:3000/users/getStadiums';
  showStadiumSpinner = false;
  showStadiumArrayError = '';

  constructor(private submitService: SubmitService) { }

  ngOnInit() {
    this.showStadiumSpinner = true;
    this.submitService.getData(this.getStadiumUrl).subscribe(
      (res: Stadium[]) => {
        this.showStadiumSpinner = false;
        this.stadiums = res;
      },
      err => {
        console.log(err);
        this.showStadiumSpinner = false;
        this.showStadiumArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

}

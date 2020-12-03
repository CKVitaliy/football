import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubmitService} from '../share/submit.service';
import {Stadium} from '../reservation/reservation.component';

@Component({
  selector: 'app-admin-edit-stadium',
  templateUrl: './admin-edit-stadium.component.html',
  styleUrls: ['./admin-edit-stadium.component.css']
})
export class AdminEditStadiumComponent implements OnInit {
  showGetStadiumsArraySpinner = false;
  getStadiumsUrl = 'http://localhost:3000/users/getStadiums';
  showGetStadiumsArrayError = '';
  stadiumsArray: Stadium[] = [];
  panelOpenState = null;
  selectedImage = null;
  editStadiumUrl = 'http://localhost:3000/admin/editStadium';
  showEditStadiumSpinner = false;
  disableButton = false;
  showEditStadiumError = '';
  deleteStadiumUrl = 'http://localhost:3000/admin/deleteStadium';
  showDeleteStadiumSpinner = false;
  showDeleteStadiumError = '';
  editStadiumForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    image: ['']
  });

  constructor(private submitService: SubmitService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.showGetStadiumsArraySpinner = true;
    this.submitService.getData(this.getStadiumsUrl).subscribe(
      (res: Stadium[]) => {
        this.showGetStadiumsArraySpinner = false;
        this.stadiumsArray = res;
      },
      err => {
        console.log(err);
        this.showGetStadiumsArraySpinner = false;
        this.showGetStadiumsArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

  clear() {
    this.showGetStadiumsArrayError = '';
    this.showEditStadiumError = '';
    this.showDeleteStadiumError = '';
  }

  openPanel(i, el) {
    this.clear();
    this.panelOpenState = i;
    this.editStadiumForm.patchValue({
      name: el.name,
      address: el.address,
      phone: el.phone,
      image: ''
    });
    this.editStadiumForm.markAsPristine();
  }

  onChangeImage(event) {
    this.selectedImage = event.target.files[0];
  }

  onlyNumber(event) {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

  editStadium(el) {
    this.clear();
    this.showEditStadiumSpinner = true;
    this.disableButton = true;
    const data = new FormData();
    data.append('name', this.editStadiumForm.get('name').value.trim());
    data.append('address', this.editStadiumForm.get('address').value.trim());
    data.append('phone', this.editStadiumForm.get('phone').value.trim());
    data.append('image', this.selectedImage);
    data.append('_id', el._id);
    this.submitService.postData(this.editStadiumUrl, data).subscribe(
      () => {
        this.submitService.getData(this.getStadiumsUrl).subscribe(
          (res: Stadium[]) => {
            this.showEditStadiumSpinner = false;
            this.editStadiumForm.reset();
            this.stadiumsArray = res;
            this.selectedImage = null;
            this.panelOpenState = null;
            this.disableButton = false;
          },
          err => {
            console.log(err);
            this.showEditStadiumSpinner = false;
            this.disableButton = false;
            this.showGetStadiumsArrayError = `Error status: ${err.status}, Error: ${err.statusText}`;
          }
        );
      },
      err => {
        console.log(err);
        this.showEditStadiumSpinner = false;
        this.disableButton = false;
        this.showEditStadiumError = `Error status: ${err.status}, Error: ${err.error.err}`;
      }
    );
  }

  deleteStadium(el) {
    this.showDeleteStadiumSpinner = true;
    const url = `${this.deleteStadiumUrl}/${el._id}`;
    this.submitService.deleteData(url).subscribe(
      () => {
        this.submitService.getData(this.getStadiumsUrl).subscribe(
          (res: Stadium[]) => {
            this.showDeleteStadiumSpinner = false;
            this.stadiumsArray = res;
            this.selectedImage = null;
            this.panelOpenState = null;
          },
          err => {
            console.log(err);
            this.selectedImage = null;
            this.panelOpenState = null;
            this.showDeleteStadiumSpinner = false;
            this.showGetStadiumsArrayError = `Error status: ${err.status}, Error: ${err.statusText}`;
          }
        );
      },
      err => {
        console.log(err);
        this.showDeleteStadiumSpinner = false;
        this.showDeleteStadiumError = `Error status: ${err.status},Error statusText: ${err.statusText}`;
      }
    );
  }

}

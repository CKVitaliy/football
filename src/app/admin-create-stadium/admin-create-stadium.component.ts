import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubmitService} from '../share/submit.service';

@Component({
  selector: 'app-admin-create-stadium',
  templateUrl: './admin-create-stadium.component.html',
  styleUrls: ['./admin-create-stadium.component.css']
})
export class AdminCreateStadiumComponent implements OnInit {
  selectedImage = null;
  url = 'http://localhost:3000/admin/createStadium';
  showSpinner = false;
  disableButton = false;
  showSuccess = false;
  showError = '';
  createStadiumForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
    image: ['']
  });

  constructor(private fb: FormBuilder, private submitService: SubmitService) {
  }

  ngOnInit() {
  }

  clear() {
    this.showError = '';
    this.showSuccess = false;
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

  createStadium() {
    this.clear();
    this.showSpinner = true;
    this.disableButton = true;
    const data = new FormData();
    data.append('name', this.createStadiumForm.get('name').value.trim());
    data.append('address', this.createStadiumForm.get('address').value.trim());
    data.append('phone', this.createStadiumForm.get('phone').value);
    data.append('image', this.selectedImage);
    this.submitService.postData(this.url, data).subscribe(
      () => {
        this.showSpinner = false;
        this.showSuccess = true;
        this.selectedImage = null;
        this.createStadiumForm.reset();
        this.disableButton = false;
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.disableButton = false;
        this.showError = `Error status: ${err.status}, Error: ${err.error.err}`;
      }
    );
  }

}

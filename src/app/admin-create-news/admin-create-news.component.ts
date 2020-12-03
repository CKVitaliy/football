import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {SubmitService} from '../share/submit.service';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-create-news',
  templateUrl: './admin-create-news.component.html',
  styleUrls: ['./admin-create-news.component.css']
})
export class AdminCreateNewsComponent implements OnInit {
  selectedImage = null;
  url = 'http://localhost:3000/admin/createNews';
  showSpinner = false;
  disableButton = false;
  showSuccess = false;
  showError = '';
  createNewsForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
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

  createNews() {
    this.clear();
    this.showSpinner = true;
    this.disableButton = true;
    const data = new FormData();
    data.append('title', this.createNewsForm.get('title').value.trim());
    data.append('text', this.createNewsForm.get('text').value.trim());
    data.append('image', this.selectedImage);
    data.append('date', moment().format('DD.MM.YYYY HH:mm'));
    this.submitService.postData(this.url, data).subscribe(
      () => {
        this.showSpinner = false;
        this.showSuccess = true;
        this.selectedImage = null;
        this.createNewsForm.reset();
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

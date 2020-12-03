import {Component, OnInit, ViewChild} from '@angular/core';
import {SubmitService} from '../share/submit.service';
import {FormBuilder, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material';

export interface News {
  date: string;
  title: string;
  text: string;
  image: string;
  _id: string;
}

@Component({
  selector: 'app-admin-edit-news',
  templateUrl: './admin-edit-news.component.html',
  styleUrls: ['./admin-edit-news.component.css']
})
export class AdminEditNewsComponent implements OnInit {
  showGetNewsArraySpinner = false;
  getNewsArrayUrl = 'http://localhost:3000/users/getNewsArray';
  showGetNewsArrayError = '';
  newsArray: News[] = [];
  newsArraySliced: News[] = [];
  panelOpenState = null;
  selectedImage = null;
  editNewsUrl = 'http://localhost:3000/admin/editNews';
  showEditNewsSpinner = false;
  disableButton = false;
  @ViewChild(MatPaginator, { static : false} ) paginator: MatPaginator;
  showEditNewsError = '';
  deleteNewsUrl = 'http://localhost:3000/admin/deleteNews';
  showDeleteNewsSpinner = false;
  showDeleteNewsError = '';
  editNewsForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    image: ['']
  });

  constructor(private submitService: SubmitService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.showGetNewsArraySpinner = true;
    this.submitService.getData(this.getNewsArrayUrl).subscribe(
      (res: News[]) => {
        this.showGetNewsArraySpinner = false;
        this.newsArray = res.reverse();
        this.newsArraySliced = this.newsArray.slice(0, 5);
      },
      err => {
        console.log(err);
        this.showGetNewsArraySpinner = false;
        this.showGetNewsArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

  clear() {
    this.showGetNewsArrayError = '';
    this.showEditNewsError = '';
    this.showDeleteNewsError = '';
  }

  openPanel(i, el) {
    this.clear();
    this.panelOpenState = i;
    this.editNewsForm.patchValue({
      title: el.title,
      text: el.text,
      image: ''
    });
    this.editNewsForm.markAsPristine();
  }

  onChangeImage(event) {
    this.selectedImage = event.target.files[0];
  }

  pageChange(el) {
    this.panelOpenState = null;
    this.editNewsForm.reset();
    const startIndex = el.pageIndex * el.pageSize;
    let endIndex = startIndex + el.pageSize;
    if (endIndex > this.newsArray.length) {
      endIndex = this.newsArray.length;
    }
    this.newsArraySliced = this.newsArray.slice(startIndex, endIndex);
  }

  editNews(el) {
    this.clear();
    this.showEditNewsSpinner = true;
    this.disableButton = true;
    const data = new FormData();
    data.append('title', this.editNewsForm.get('title').value.trim());
    data.append('text', this.editNewsForm.get('text').value.trim());
    data.append('image', this.selectedImage);
    data.append('date', el.date);
    data.append('_id', el._id);
    this.submitService.postData(this.editNewsUrl, data).subscribe(
      () => {
        this.submitService.getData(this.getNewsArrayUrl).subscribe(
          (res: News[]) => {
            this.showEditNewsSpinner = false;
            this.editNewsForm.reset();
            this.newsArray = res.reverse();
            this.newsArraySliced = this.newsArray.slice(0, 5);
            this.selectedImage = null;
            this.panelOpenState = null;
            this.disableButton = false;
            this.paginator.firstPage();
          },
          err => {
            console.log(err);
            this.showEditNewsSpinner = false;
            this.disableButton = false;
            this.showGetNewsArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
          }
        );
      },
      err => {
        console.log(err);
        this.showEditNewsSpinner = false;
        this.disableButton = false;
        this.showEditNewsError = `Error status: ${err.status},Error statusText: ${err.statusText}`;
      }
    );
  }

  deleteNews(el) {
    this.showDeleteNewsSpinner = true;
    const url = `${this.deleteNewsUrl}/${el._id}`;
    this.submitService.deleteData(url).subscribe(
      () => {
        this.submitService.getData(this.getNewsArrayUrl).subscribe(
          (res: News[]) => {
            this.showDeleteNewsSpinner = false;
            this.newsArray = res.reverse();
            this.newsArraySliced = this.newsArray.slice(0, 5);
            this.selectedImage = null;
            this.panelOpenState = null;
            this.paginator.firstPage();
          },
          err => {
            console.log(err);
            this.selectedImage = null;
            this.panelOpenState = null;
            this.showDeleteNewsSpinner = false;
            this.showGetNewsArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
          }
        );
      },
      err => {
        console.log(err);
        this.showDeleteNewsSpinner = false;
        this.showDeleteNewsError = `Error status: ${err.status},Error statusText: ${err.statusText}`;
      }
    );
  }

}

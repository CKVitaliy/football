import {Component, OnInit} from '@angular/core';
import {News} from '../admin-edit-news/admin-edit-news.component';
import {SubmitService} from '../share/submit.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {

  showSpinner = false;
  showGetNewsArrayError = '';
  getNewsUrl = 'http://localhost:3000/users/getNewsArray';

  newsArray: News[] = [];
  newsArraySliced: News[] = [];

  constructor(private submitService: SubmitService) {
  }

  ngOnInit() {
    this.showSpinner = true;
    this.submitService.getData(this.getNewsUrl).subscribe(
      (res: News[]) => {
        this.showSpinner = false;
        this.newsArray = res.reverse();
        this.newsArraySliced = this.newsArray.slice(0, 5);
      },
      err => {
        console.log(err);
        this.showSpinner = false;
        this.showGetNewsArrayError = `Error status: ${err.status}, Error statusText: ${err.statusText}`;
      }
    );
  }

  pageChange(el) {
    const startIndex = el.pageIndex * el.pageSize;
    let endIndex = startIndex + el.pageSize;
    if (endIndex > this.newsArray.length) {
      endIndex = this.newsArray.length;
    }
    this.newsArraySliced = this.newsArray.slice(startIndex, endIndex);
  }
}

import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
  }

  submit() {
    this.http.get(this.url).subscribe(resp => console.log(resp));
  }
}

import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  user: User;
  data: DataService;
  


  constructor (dataService: DataService){
    this.data = dataService;
    console.log("This is only a test");
    console.log(this.data.user);
  }
}


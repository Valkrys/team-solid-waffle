import { Component } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  router: string;

  data: DataService;
  
  

  constructor (dataService: DataService, private _router: Router){
    this.data = dataService;
    this.router = _router.url;
  }
}


import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Role } from '../../role';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  data: DataService;
  role : Role;

  constructor(dataservice: DataService ) { 
    this.data = dataservice;
  }

  ngOnInit() {
  }

}

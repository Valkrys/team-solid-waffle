import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Role } from '../../role';
import { CompareRolesComponent } from '../compare-roles/compare-roles.component';
// import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-responsibility',
  templateUrl: './responsibility.component.html',
  styleUrls: ['./responsibility.component.css']
})
export class ResponsibilityComponent implements OnInit {

  data: DataService;
  role : Role;


  constructor(dataservice: DataService) { 
    this.data = dataservice;
  }

  ngOnInit() {
  }



}

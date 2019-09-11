import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Role } from '../../role';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  data: DataService;
  role : Role;

  constructor(dataservice: DataService) { 
    this.data = dataservice;
  }

  ngOnInit() {
  }

}

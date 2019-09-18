import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Role } from '../../role';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainings: string[];

  constructor(private data: DataService) { 
    this.data.getRoleDetail(1).subscribe(role => {
      this.trainings = role.training.split(',');
    });
  }

  ngOnInit() {
  }

}

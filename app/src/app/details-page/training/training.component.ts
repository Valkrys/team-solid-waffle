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
  roleID: number;

  constructor(private data: DataService) {
    if((window.location.href).split('/').length == 5)
    {
      this.roleID = parseInt((window.location.href).split('/')[4]);
    }
    else if(isNaN(this.roleID))
    {
      this.roleID = this.data.user.userID;
    }
    else
    {
      console.log("ERROR");
      
    }
    this.data.getRoleDetail(this.roleID).subscribe(role => {
      this.trainings = role.training.split(',');
    });
  }

  ngOnInit() {
  }

}

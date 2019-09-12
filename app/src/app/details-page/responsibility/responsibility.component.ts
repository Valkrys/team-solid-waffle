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
  
  responsibilities: string[];
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
      this.responsibilities = role.responsibilities.split('.');
    });
  }

  ngOnInit() {
  }
}

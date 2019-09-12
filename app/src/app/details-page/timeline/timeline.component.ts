import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Role } from 'src/app/role';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  
  roles: Role[];
  roleID: number;
  data: DataService;
  allRoles: Role[];
  
  
  constructor(private dataservice: DataService) {
    this.data = dataservice;
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
    this.data.getRoleList().subscribe(roles => {
      this.allRoles = roles;
      console.log(this.allRoles);
      this.roles = roles.filter(role => role.capabilityID === roles[this.roleID-1].capabilityID)
        .sort((a, b) => a.bandRank - b.bandRank);
    });

  }
  
  isLessThanCurrentRole(role: Role): boolean {
    // TODO: The role bandRank should be input into this component
    return role.bandRank <= this.allRoles[this.data.user.roleID].bandRank ? true : false;
  }

  ngOnInit() {
  }
}
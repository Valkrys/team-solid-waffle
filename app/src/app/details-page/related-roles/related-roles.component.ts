import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-related-roles',
  templateUrl: './related-roles.component.html',
  styleUrls: ['./related-roles.component.css']
})
export class RelatedRolesComponent implements OnInit {

  roles: Role[];
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
    this.data.getRoleList().subscribe(roles => {
      // TODO: The band ID should be input into this component
      this.roles = roles.filter(role => role.bandID === roles[this.roleID].bandID);
    });
  }

  ngOnInit() {
  }

}

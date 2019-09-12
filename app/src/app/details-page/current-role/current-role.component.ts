import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-current-role',
  templateUrl: './current-role.component.html',
  styleUrls: ['./current-role.component.css']
})
export class CurrentRoleComponent implements OnInit {

  role: Role;
  roleID: number;
  name: string;

  constructor(private data: DataService ) { 
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

    this.name = data.user.firstName;

    this.data.getRoleDetail(this.roleID).subscribe(role => this.role = role);
  }

  checkifURLHomePage()
  {
    return true;
  }

  ngOnInit() {
  }

}

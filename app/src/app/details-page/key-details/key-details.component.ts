import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-key-details',
  templateUrl: './key-details.component.html',
  styleUrls: ['./key-details.component.css']
})
export class KeyDetailsComponent implements OnInit {

  role: Role;
  roleID: number;

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
    this.data.getRoleDetail(this.roleID).subscribe(role => this.role = role);
  }

  ngOnInit() {
  }

}

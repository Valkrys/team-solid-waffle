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

  constructor(private data: DataService) {
    this.data.getRoleList().subscribe(roles => {
      // TODO: The band ID should be input into this component
      this.roles = roles.filter(role => role.bandID === 2);
    });
  }

  ngOnInit() {
  }

}

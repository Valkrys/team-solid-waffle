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
  
  constructor(private data: DataService) {
    this.data.getRoleList().subscribe(roles => {
      // TODO: The capability ID should be input into this component
      this.roles = roles.filter(role => role.capabilityID === 7)
        .sort((a, b) => a.bandRank - b.bandRank);
    });
  }
  
  isLessThanCurrentRole(role: Role): boolean {
    // TODO: The role bandRank should be input into this component
    return role.bandRank <= 2 ? true : false;
  }

  ngOnInit() {
  }
}
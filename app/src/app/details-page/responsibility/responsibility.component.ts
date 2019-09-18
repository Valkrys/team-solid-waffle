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

  constructor(private data: DataService) { 
    this.data.getRoleDetail(1).subscribe(role => {
      this.responsibilities = role.responsibilities.split('.');
    });
  }

  ngOnInit() {
  }
}

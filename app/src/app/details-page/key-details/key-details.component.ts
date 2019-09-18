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

  constructor(private data: DataService) {
    this.data.getRoleDetail(1).subscribe(role => this.role = role);
  }

  ngOnInit() {
  }

}

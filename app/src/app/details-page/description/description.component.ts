import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Role } from '../../role';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  role : Role;

  constructor(private data: DataService ) { 
    this.data.getRoleDetail(1).subscribe(role => this.role = role);
  }

  ngOnInit() {
  }

}

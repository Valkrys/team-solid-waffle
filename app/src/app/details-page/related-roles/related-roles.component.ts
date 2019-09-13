import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CarouselRole } from '../../carouselRole';

@Component({
  selector: 'app-related-roles',
  templateUrl: './related-roles.component.html',
  styleUrls: ['./related-roles.component.css']
})
export class RelatedRolesComponent implements OnInit {
  card = [];
  data: DataService;
  carouselRole: CarouselRole;

  constructor(dataservice: DataService) { 
    this.data = dataservice;

  }

  ngOnInit() {
  }

}

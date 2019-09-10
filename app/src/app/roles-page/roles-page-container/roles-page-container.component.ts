import { Component, OnInit } from '@angular/core';
import { Band } from 'src/app/band';
import { Capability } from 'src/app/capability';
import { DataService } from 'src/app/data.service';
import { Family } from 'src/app/family';

@Component({
  selector: 'app-roles-page-container',
  templateUrl: './roles-page-container.component.html',
  styleUrls: ['./roles-page-container.component.css']
})
export class RolesPageContainerComponent implements OnInit {

  data: DataService;
  selectedFamily: string = "";
  selectedCapability: string = "";
  selectedBand: string = "";
  searchText: string = "";

  constructor(data: DataService) {
    this.data = data;
  }

  onFamilyChange() {
    // When the family changes, reset the capability dropdown
    this.selectedCapability = "";
  }

  ngOnInit() {
  }

}
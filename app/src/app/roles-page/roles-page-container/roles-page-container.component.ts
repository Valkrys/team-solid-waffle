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
  
  ngOnInit() {
  }

  onFamilyChange(family: Family): void {
    console.log("Roles.ts reconginezed this:");
    console.log(family);
    console.log(`SelectedFamily: ${this.selectedFamily}`)
  }

  onCapabilityChange(capability: Capability): void {
    console.log(capability);
    console.log(`SelectedCapability: ${this.selectedCapability}`)
  }

  onBandChange(band: Band): void {
    console.log(band);
    console.log(`SelectedBand: ${this.selectedBand}`)
  }
}
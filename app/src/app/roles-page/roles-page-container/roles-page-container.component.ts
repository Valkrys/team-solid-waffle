import { Component, OnInit } from '@angular/core';
import { Band } from 'src/app/band';
import { Capability } from 'src/app/capability';
import { DataService } from 'src/app/data.service';
import { Family } from 'src/app/family';
import { Role } from 'src/app/role';

@Component({
  selector: 'app-roles-page-container',
  templateUrl: './roles-page-container.component.html',
  styleUrls: ['./roles-page-container.component.css']
})
export class RolesPageContainerComponent implements OnInit {
  roles: Role[];
  capabilities: Capability[];
  families: Family[];
  bands: Band[];

  selectedFamily: string = "";
  selectedCapability: string = "";
  selectedBand: string = "";
  searchText: string = "";

  constructor(private data: DataService) {
    data.getRoleList().subscribe(roles => this.roles = roles);
    data.getCapabilityList().subscribe(capabilities => this.capabilities = capabilities);
    data.getFamilyList().subscribe(families => this.families = families);
    data.getBandList().subscribe(bands => this.bands = bands);
  }

  onFamilyChange() {
    // When the family changes, reset the capability dropdown
    this.selectedCapability = "";
  }

  ngOnInit() {
  }

}
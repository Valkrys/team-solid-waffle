import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Capability } from 'src/app/capability';
import { Family } from 'src/app/family';


@Component({
  selector: 'app-capability-list-container',
  templateUrl: './capability-list-container.component.html',
  styleUrls: ['./capability-list-container.component.css']
})
export class CapabilityListContainerComponent implements OnInit {
  capabilities: Capability[];
  families: Family[];

  selectedFamily: string = "";
  searchText: string = "";

  constructor(data: DataService) {
    data.getCapabilityList().subscribe(capabilities => this.capabilities = capabilities);
    data.getFamilyList().subscribe(families => this.families = families);
  }

  ngOnInit() {
  }
}

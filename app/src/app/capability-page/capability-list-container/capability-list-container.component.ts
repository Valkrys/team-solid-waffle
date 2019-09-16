import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Family } from 'src/app/family';


@Component({
  selector: 'app-capability-list-container',
  templateUrl: './capability-list-container.component.html',
  styleUrls: ['./capability-list-container.component.css']
})
export class CapabilityListContainerComponent implements OnInit {
  data: DataService;
  selectedFamily: string = "";
  searchText: string = "";

  constructor(data: DataService) {
    this.data = data;
  }

  ngOnInit() {
  }

  onFamilyChange(family: Family): void {
    console.log(family);
    console.log(`SelectedFamily: ${this.selectedFamily}`)
  }

}

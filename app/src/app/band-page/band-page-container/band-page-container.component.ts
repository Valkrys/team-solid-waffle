import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Band } from 'src/app/band'

@Component({
  selector: 'app-band-page-container',
  templateUrl: './band-page-container.component.html',
  styleUrls: ['./band-page-container.component.css']
})
export class BandPageContainerComponent implements OnInit {
  bands: Band[];

  searchText: string = "";

  constructor(private data: DataService) {
    data.getBandList().subscribe(bands => this.bands = bands);
  }

  ngOnInit() {
  }


}

import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-band-page-container',
  templateUrl: './band-page-container.component.html',
  styleUrls: ['./band-page-container.component.css']
})
export class BandPageContainerComponent implements OnInit {
  data: DataService;
  searchText: string = "";

  constructor(data: DataService) {
    this.data = data;
  }

  ngOnInit() {
  }


}

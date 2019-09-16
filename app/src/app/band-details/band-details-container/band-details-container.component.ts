import { Component, OnInit } from '@angular/core';
import {DataService} from '../../data.service';
import {Band} from '../../band';

@Component({
  selector: 'app-band-details-container',
  templateUrl: './band-details-container.component.html',
  styleUrls: ['./band-details-container.component.css']
})
export class BandDetailsContainerComponent implements OnInit {

  data: DataService;
  band: Band;

  constructor(dataservice: DataService) {
    this.data = dataservice;
    this.data.getBandDetails();
  }

  ngOnInit() {
  }
}

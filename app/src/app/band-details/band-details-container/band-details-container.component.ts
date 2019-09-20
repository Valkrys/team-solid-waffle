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
  bandID: number;

  constructor(dataservice: DataService) {
    this.data = dataservice;
    // tslint:disable-next-line:radix
    this.bandID = parseInt((window.location.href).split('/')[4]);
    console.log('this is the role id: ' + this.bandID);
    this.data.getBandDetails(this.bandID).subscribe(band => this.band = band);
  }

  ngOnInit() {
  }
}

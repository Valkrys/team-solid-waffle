import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { KeyDetails} from '../../keyDetails';

@Component({
  selector: 'app-key-details',
  templateUrl: './key-details.component.html',
  styleUrls: ['./key-details.component.css']
})
export class KeyDetailsComponent implements OnInit {

  data: DataService;
  keyDetails: KeyDetails;
  
  constructor(dataService: DataService) {
    this.data = dataService;
   }

  ngOnInit() {
  }

}

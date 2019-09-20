import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Band } from 'src/app/band'
import {Router} from "@angular/router";

@Component({
  selector: 'app-band-page-container',
  templateUrl: './band-page-container.component.html',
  styleUrls: ['./band-page-container.component.css']
})
export class BandPageContainerComponent implements OnInit {
  bands: Band[];
  router: Router;

  searchText: string = "";

  constructor(private data: DataService, router: Router) {
    this.router = router;
    data.getBandList().subscribe(bands => this.bands = bands);
  }

  ngOnInit() {
  }

  routeToAddBand() {
    this.router.navigate(['/add/band']);
  }


}

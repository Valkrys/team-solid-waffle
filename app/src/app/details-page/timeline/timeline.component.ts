import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { TimelineRole } from 'src/app/timelineRole';
import { KeyDetails } from 'src/app/keyDetails';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  data: DataService;
  timelineRole: TimelineRole;
  keyDetails: KeyDetails;
  
  private Extradata = [
    { passed: true, title: 'Gathering Information' },
    { passed: true, title: 'Planning' },
    { passed: false, title: 'Design' },
    { passed: false, title: 'Content Writing and Assembly' },
    { passed: false, title: 'Coding' },
    { passed: false, title: 'Testing, Review & Launch' },
    { passed: false, title: 'Maintenance' }
  ];
  
  constructor(dataservice: DataService) { 
    this.data = dataservice;
  }

  ngOnInit() {
  }

  isRoleLessThanCurrentRole(bandRank:number): boolean
  {
    
    if(bandRank <= parseInt(this.data.keyDetails.bandRank))
    {
      return true;
    }

    return false;
  }

}
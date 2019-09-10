import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  private data = [
    { passed: true, title: 'Gathering Information' },
    { passed: true, title: 'Planning' },
    { passed: false, title: 'Design' },
    { passed: false, title: 'Content Writing and Assembly' },
    { passed: false, title: 'Coding' },
    { passed: false, title: 'Testing, Review & Launch' },
    { passed: false, title: 'Maintenance' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}





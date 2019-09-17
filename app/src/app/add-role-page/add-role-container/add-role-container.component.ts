import { Component, OnInit } from '@angular/core';
import { Role } from '../../role';

@Component({
  selector: 'app-add-role-container',
  templateUrl: './add-role-container.component.html',
  styleUrls: ['./add-role-container.component.css']
})
export class AddRoleContainerComponent implements OnInit {

  submitted = false;

  model = <Role> {
    roleName: "Software Engineer",
    roleDescription: "gwg.gwrgwrg ",
    responsibilities: "Hfw.wgw",
    training: "wg,wgwgw ",
    bandName: " wggw.grg",
    jobFamilyName: "wg.wgwgw ",
    capabilityName: "wgweg.g "
  } 
  
  //HARD CODED TESTS
  capabilities = ["Test", "Technical", "Sales"];
  band = ["To be fired", "Trainee", "I don't work here"];
  training = ["Google", "StackOverflow"];

  constructor() {}

  onSubmit() { this.submitted = true; }

  ngOnInit() {
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}

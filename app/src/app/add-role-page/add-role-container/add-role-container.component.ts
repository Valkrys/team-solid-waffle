import { Component, OnInit } from '@angular/core';
import { Role } from '../../role';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-role-container',
  templateUrl: './add-role-container.component.html',
  styleUrls: ['./add-role-container.component.css']
})
export class AddRoleContainerComponent implements OnInit {

  submitted = false;
  addRoleForm: FormGroup;

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
  capabilities = ["Test", "Technical", "Sales", "Google"];
  band = ["To be fired", "Trainee", "I don't work here", "Google"];
  training = ["Google", "StackOverflow"];

  constructor() {
      this.model.bandName = this.band[0]
      this.model.capabilityName = this.capabilities[0];
      this.model.training = this.training[0];
    }

  onSubmit() { this.submitted = true; }

  ngOnInit(): void{}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}

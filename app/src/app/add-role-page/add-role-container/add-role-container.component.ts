import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Role } from 'src/app/role';
import { Capability } from 'src/app/capability';
import { Band } from 'src/app/band';
//import { Training } from 'src/app/training';

@Component({
  selector: 'app-add-role-container',
  templateUrl: './add-role-container.component.html',
  styleUrls: ['./add-role-container.component.css']
})
export class AddRoleContainerComponent implements OnInit {

  submitted = false;
  addRoleForm: FormGroup;

  //TODO: change model variable to point to different lists.
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
  capability = ["Test", "Technical", "Sales", "Google"];
  band = ["To be fired", "Trainee", "I don't work here", "Google"];
  training = ["Google", "StackOverflow"];

  /*
  roles: Role[];
  capabilities: Capability[];
  bands: Band[];
  training: Training[];*/


  constructor(private dataService: DataService) {
   //   dataService.getRoleList().subscribe(roles => this.roles = roles);
    //  dataService.getCapabilityList().subscribe(capabilities => this.capabilities = capabilities);
     // dataService.getBandList().subscribe(bands => this.bands = bands);
      //dataService.getTrainingList().subscribe(training => this.training = training);
      this.model.bandName = this.band[0]
      this.model.capabilityName = this.capability[0];
      this.model.training = this.training[0];
    }

  onSubmit() { this.submitted = true; }

  ngOnInit(): void{}

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}

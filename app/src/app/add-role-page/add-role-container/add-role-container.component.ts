import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Capability } from 'src/app/capability';
import { Band } from 'src/app/band';
import { Training } from 'src/app/training';
import { Role } from 'src/app/role';

@Component({
  selector: 'app-add-role-container',
  templateUrl: './add-role-container.component.html',
  styleUrls: ['./add-role-container.component.css']
})
export class AddRoleContainerComponent implements OnInit {

  submitted = false;
  addRoleForm: FormGroup;

  //TODO: change model variable to point to different lists.
  model = <Role> {};
  /*
    roleID= ,
    roleName: "",
    roleDescription: "",
    responsibilities: "",
    training: "",
    bandID: null,
    bandName: "",
    bandRank: null,
    jobFamilyID: null,
    jobFamilyName: "",
    capabilityID: ,
    capabilityName: "";
  } */

  capabilities: Capability[];
  bands: Band[];
  trainings: Training[];


  constructor(private dataService: DataService) {

      dataService.getCapabilityList().subscribe(capabilities => this.capabilities = capabilities);
      dataService.getBandList().subscribe(bands => this.bands = bands);
      dataService.getTrainingList().subscribe(trainings => this.trainings = trainings);
    }

  onSubmit() { 
    this.submitted = true; 
    this.dataService.addNewRole(this.model);
  }

  ngOnInit(): void{
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}

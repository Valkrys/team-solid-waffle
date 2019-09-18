import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Role } from 'src/app/role';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/shared/editable-option/editable-option.component';

@Component({
  selector: 'app-details-container',
  templateUrl: './details-container.component.html',
  styleUrls: ['./details-container.component.css']
})
export class DetailsContainerComponent implements OnInit {

  id: number;
  role: Role;
  oldRole: Role;
  editMode = false;
  familyOptions: Item[] = [];
  capabilityOptions: Item[] = [];
  bandOptions: Item[] = [];
  responsibilities: string[] = [];
  training: string[] = [];

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.data.getRoleDetail(1).subscribe(role => {
      this.role = role;
      this.oldRole = JSON.parse(JSON.stringify(role));
      this.responsibilities = role.responsibilities.split('.').map(x => x.trim()).filter(x => x != '');
      this.training = role.training.split(',').map(x => x.trim()).filter(x => x != '');
    });
    this.data.getFamilyList().subscribe(families => {
      for (let family of families) {
        this.familyOptions.push({value: `${family.jobFamilyID}`, content: family.jobFamilyName});
      }
    });
    this.data.getCapabilityList().subscribe(capabilites => {
      for (let capability of capabilites) {
        this.capabilityOptions.push({value: `${capability.capabilityID}`, content: capability.capabilityName});
      }
    });
    this.data.getBandList().subscribe(bands => {
      for (let band of bands) {
        this.bandOptions.push({value: `${band.bandID}`, content: band.bandName  });
      }
    });
  }

  updateRole(field, value): void {
    switch(field) {
      case 'responsibilities':
        this.role.responsibilities = value.join('.');
        break;
      case 'training':
        this.role.training = value.join(',');
        break;
      default:
        this.role[field] = value;
    }
    console.log(field);
    console.log(this.role, this.oldRole);
  }

  cancelEdit(): void {
    this.role = JSON.parse(JSON.stringify(this.oldRole));
    this.editMode = false;
  }

  saveEdit(): void {
    console.log("Updating role", this.role);
    this.data.updateRole(this.role.roleID, this.role).subscribe(updatedRole => {
      console.log(updatedRole);
      this.role = updatedRole;
      this.editMode = false;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      console.log(`Routed to ${this.id}`);
    });
  }

}

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

  id: number = 1;
  role: Role;
  oldRole: Role;
  editMode = false;
  familyOptions: Item[] = [];
  capabilityOptions: Item[] = [];
  bandOptions: Item[] = [];
  responsibilities: string[] = [];
  training: string[] = [];
  error: string;
  roles: Role[];

  constructor(private route: ActivatedRoute, private data: DataService) {
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
    this.data.getRoleList().subscribe(roles => this.roles = roles);
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

      if (this.roles.find(r => {
        const isExisting = r.roleID != this.role.roleID && r.capabilityID == this.role.capabilityID && r.bandID == this.role.bandID;
        return isExisting;
      })) {
        this.error = `There is already a role for capability '${this.role.capabilityName}' on band '${this.role.bandName}'`;
      } else {
        this.error = '';
      }
    }
  }

  cancelEdit(): void {
    this.role = JSON.parse(JSON.stringify(this.oldRole));
    this.error = ''
    this.editMode = false;
  }

  saveEdit(): void {
    if (!this.error) {
      console.log("Updating role", this.role);
      this.data.updateRole(this.role.roleID, this.role).subscribe(updatedRole => {
        this.role = updatedRole;
        this.editMode = false;
      });
    } else {
      console.log(`Cannot submit, there is an error: ${this.error}`);
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']) || 1;
      console.log(`Routed to ${this.id}`);
      this.data.getRoleDetail(this.id).subscribe(role => {
        this.role = role;
        this.oldRole = JSON.parse(JSON.stringify(role));
        this.responsibilities = role.responsibilities.split('.').map(responsibility => responsibility.trim()).filter(responsibility => responsibility != '');
        this.training = role.training.split(',').map(responsibility => responsibility.trim()).filter(responsibility => responsibility != '');
      });
    });
  }

}

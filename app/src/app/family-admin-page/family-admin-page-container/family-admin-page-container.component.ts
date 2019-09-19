import { Component, OnInit } from '@angular/core';
import { Family } from '../../family'
import { DataService } from 'src/app/data.service';
import { EditableOptionComponent } from 'src/app/shared/editable-option/editable-option.component';

const clone = items => items.map(item => Array.isArray(item) ? clone(item) : item);

@Component({
  selector: 'app-family-admin-page-container',
  templateUrl: './family-admin-page-container.component.html',
  styleUrls: ['./family-admin-page-container.component.css']
})
export class FamilyAdminPageContainerComponent implements OnInit {
  families: Family[];
  oldFamilies: string[] = [];
  selectedFamily: string = "";
  dependencies: boolean = false;
  noDependencies: boolean = true;
  public newFamily: string = "";
  success: string = "";
  failure: string = "";
  editMode = false;
  toDeleteName: string;

  constructor(private data: DataService) {
    data.getFamilyList().subscribe(families => {
      this.families = families;
      this.oldFamilies = families.map(x => x.jobFamilyName);
    });
  }

  onAdminFamilyChange() {

  }

  hide() {
    console.log("Hiding");
  }

  deleteFamily(name: string) {
    this.data.getCapabilityList().subscribe(caps => {
      console.log(name);
      if (caps.find(c => c.jobFamilyName.toLowerCase() == name.toLowerCase())) {
        this.dependencies = true;
        this.noDependencies = false;
      }
      else {
        this.dependencies = false;
        this.noDependencies = true;
      }
    });
  }

  successMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
    }, 5000);
  }
  failureMessage(message: string) {
    this.failure = message;
    setTimeout(() => {
      this.failure = '';
    }, 5000);
  }

  addNewFamily(addForm): void {
    console.log("addFamily");
    if (addForm.valid) {
      this.data.addFamily(this.newFamily).subscribe(fam => {
        if (fam == null) {
          this.failureMessage('Unable to add family, try again!');
        } else {
          this.successMessage('Family added successfully!');
          this.families.push(fam);
          this.oldFamilies.push(fam + "");
          this.newFamily = "";
          addForm.reset();
        }
      },
        error => this.failureMessage(error.error.message));
    }
  }

  updateFamily(index, value): void {
    console.log(value);
    this.families[index].jobFamilyName = value;
  }

  reset() {
    this.success = "";
    this.failure = "";
  }

  save() {
    for (let fam of this.families) {
      this.data.updateFamily(fam.jobFamilyName, fam.jobFamilyID).subscribe(updated => {
        if (updated == null) {
          this.failureMessage('Unable to edit family, try again!');
        } else {
          console.log("update boi", updated);
          this.editMode = false;
        }
      });
    }
  }

  resetFamily() {
    for (let i in this.families) {
      this.families[i].jobFamilyName = this.oldFamilies[i];
    }
    this.editMode = false;
  }

  ngOnInit() {
  }

}

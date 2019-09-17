import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleContainerComponent } from './add-role-container/add-role-container.component';
import { FormsModule }   from '@angular/forms';



@NgModule({
  declarations: [AddRoleContainerComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AddRoleContainerComponent
  ]
})
export class AddRolePageModule { }

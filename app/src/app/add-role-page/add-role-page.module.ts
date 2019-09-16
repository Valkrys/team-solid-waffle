import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleContainerComponent } from './add-role-container/add-role-container.component';



@NgModule({
  declarations: [AddRoleContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddRoleContainerComponent
  ]
})
export class AddRolePageModule { }

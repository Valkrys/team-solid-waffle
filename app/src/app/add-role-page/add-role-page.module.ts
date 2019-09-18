import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleContainerComponent } from './add-role-container/add-role-container.component';
import { FormsModule } from '@angular/forms';
import { InvalidCapabilityBandDirective } from '../invalid-capability-band.directive';



@NgModule({
  declarations: [AddRoleContainerComponent, InvalidCapabilityBandDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AddRoleContainerComponent
  ]
})
export class AddRolePageModule { }

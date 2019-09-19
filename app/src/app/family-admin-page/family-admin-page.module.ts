import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FamilyAdminPageContainerComponent } from './family-admin-page-container/family-admin-page-container.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [FamilyAdminPageContainerComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    FamilyAdminPageContainerComponent
  ]
})
export class FamilyAdminPageModule { }

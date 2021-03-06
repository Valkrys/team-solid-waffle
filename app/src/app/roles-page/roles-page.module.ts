import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapabilityFilterPipe } from './capability-filter.pipe';
import { RolesFilterPipe } from './roles-filter.pipe';
import { RolesPageContainerComponent } from './roles-page-container/roles-page-container.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RolesPageContainerComponent,
    RolesFilterPipe,
    CapabilityFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    RolesPageContainerComponent,
    CapabilityFilterPipe
  ]
})
export class RolesPageModule { }

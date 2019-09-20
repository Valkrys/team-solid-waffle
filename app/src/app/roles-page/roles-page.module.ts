import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedFeaturesModule } from '../shared-features/shared-features.module';
import { CapabilityFilterPipe } from './capability-filter.pipe';
import { RolesFilterPipe } from './roles-filter.pipe';
import { RolesPageContainerComponent } from './roles-page-container/roles-page-container.component';

@NgModule({
  declarations: [
    RolesPageContainerComponent,
    RolesPageContainerComponent,
    RolesFilterPipe,
    CapabilityFilterPipe    
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedFeaturesModule
  ],
  exports: [
    RolesPageContainerComponent,
    CapabilityFilterPipe
  ]
})
export class RolesPageModule { }

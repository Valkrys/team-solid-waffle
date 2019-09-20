import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailsContainerComponent } from './details-container/details-container.component';
import { RelatedRolesComponent } from './related-roles/related-roles.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DetailsContainerComponent,
    RelatedRolesComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DetailsContainerComponent
  ]

})
export class DetailsPageModule { }

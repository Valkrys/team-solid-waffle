import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DescriptionComponent } from './description/description.component';
import { ResponsibilityComponent } from './responsibility/responsibility.component';
import { TrainingComponent } from './training/training.component';
import { KeyDetailsComponent } from './key-details/key-details.component';
import { RelatedRolesComponent } from './related-roles/related-roles.component';
import { CompareRolesComponent } from './compare-roles/compare-roles.component';
import { CurrentRoleComponent } from './current-role/current-role.component';
import { TimelineComponent } from './timeline/timeline.component';
import { DetailsContainerComponent } from './details-container/details-container.component';



@NgModule({
  declarations: [
    TimelineComponent, 
    DescriptionComponent, 
    ResponsibilityComponent, 
    TrainingComponent, 
    KeyDetailsComponent, 
    RelatedRolesComponent, 
    CompareRolesComponent, 
    CurrentRoleComponent, 
    DetailsContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrentRoleComponent,
    CompareRolesComponent,
    DescriptionComponent,
    TimelineComponent,
    ResponsibilityComponent,
    TrainingComponent,
    RelatedRolesComponent,
    KeyDetailsComponent,
    DetailsContainerComponent
  ]

})
export class DetailsPageModule { }

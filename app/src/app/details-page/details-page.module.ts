import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompareRolesComponent } from './compare-roles/compare-roles.component';
import { CurrentRoleComponent } from './current-role/current-role.component';
import { DescriptionComponent } from './description/description.component';
import { DetailsContainerComponent } from './details-container/details-container.component';
import { KeyDetailsComponent } from './key-details/key-details.component';
import { RelatedRolesComponent } from './related-roles/related-roles.component';
import { ResponsibilityComponent } from './responsibility/responsibility.component';
import { TimelineComponent } from './timeline/timeline.component';
import { TrainingComponent } from './training/training.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../token-interceptor.service';
import { AuthGuard } from '../auth.guard';
import { SharedFeaturesModule } from '../shared-features/shared-features.module';


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
    CommonModule,
    SharedFeaturesModule
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
  ],
  providers: [  AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }]

})
export class DetailsPageModule { }

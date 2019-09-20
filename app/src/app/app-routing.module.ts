import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBandPageContainerComponent } from './add-band-page/add-band-page-container/add-band-page-container.component';
import { AddRoleContainerComponent } from './add-role-page/add-role-container/add-role-container.component';
import { BandPageContainerComponent } from './band-page/band-page-container/band-page-container.component';
import { LeadContainerComponent } from "./capability-lead-page/lead-container/lead-container.component";
import { CapabilityListContainerComponent } from './capability-page/capability-list-container/capability-list-container.component';
import { DetailsContainerComponent } from './details-page/details-container/details-container.component';
import { RolesPageContainerComponent } from './roles-page/roles-page-container/roles-page-container.component';

export const routes: Routes = [
  {
    // TODO: The empty path should route to the user's details page, then there
    // should be another route for generic details
    path: '',
    pathMatch: 'full',
    component: DetailsContainerComponent
  },
  {
    path: 'details',
    component: DetailsContainerComponent
  },
  {
    path: 'details/:id',
    component: DetailsContainerComponent
  },
  {
    path: 'roles',
    component: RolesPageContainerComponent
  },
  {
    path: 'capabilities',
    component: CapabilityListContainerComponent
  },
  {
    path: 'capability/:id',
    component: LeadContainerComponent
  },
  {
    path: 'bands',
    component: BandPageContainerComponent
  },
  {
    path: 'addRole',
    component: AddRoleContainerComponent
  },
  {
    path: 'add/band',
    component: AddBandPageContainerComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

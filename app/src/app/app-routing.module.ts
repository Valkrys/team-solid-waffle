import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsContainerComponent } from './details-page/details-container/details-container.component';
import { RolesPageContainerComponent } from "./roles-page/roles-page-container/roles-page-container.component";
import { BandPageContainerComponent } from './band-page/band-page-container/band-page-container.component';
import { AddRoleContainerComponent } from './add-role-page/add-role-container/add-role-container.component';

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
    path: 'bands',
    component: BandPageContainerComponent
  },
  {
    path: 'addRole',
    component: AddRoleContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardsComponent } from './cards/cards.component';
import { RolesPageContainerComponent } from './roles-page-container/roles-page-container.component';
import { SharedFeaturesModule } from '../shared-features/shared-features.module';



@NgModule({
  declarations: [
    FilterHeaderComponent,
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent,
    
  ],
  imports: [
    CommonModule,
    SharedFeaturesModule
  ],
  exports: [
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent
  ]
})
export class RolesPageModule { }

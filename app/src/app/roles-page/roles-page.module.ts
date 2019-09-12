import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardsComponent } from './cards/cards.component';
import { RolesPageContainerComponent } from './roles-page-container/roles-page-container.component';



@NgModule({
  declarations: [
    FilterHeaderComponent,
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent
  ]
})
export class RolesPageModule { }

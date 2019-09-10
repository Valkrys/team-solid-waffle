import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapabilityFilterPipe } from './capability-filter.pipe';
import { CardsComponent } from './cards/cards.component';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { RolesFilterPipe } from './roles-filter.pipe';
import { RolesPageContainerComponent } from './roles-page-container/roles-page-container.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    FilterHeaderComponent,
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent,
    RolesFilterPipe,
    CapabilityFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchBarComponent,
    CardsComponent,
    RolesPageContainerComponent,
    CapabilityFilterPipe
  ]
})
export class RolesPageModule { }

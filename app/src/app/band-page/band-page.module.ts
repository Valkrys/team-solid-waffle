import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BandPageContainerComponent } from './band-page-container/band-page-container.component';
import { BandsFilterPipe } from './bands-filter.pipe';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    BandPageContainerComponent,
    BandsFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class BandPageModule { }

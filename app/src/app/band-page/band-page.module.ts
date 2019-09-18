import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BandPageContainerComponent } from './band-page-container/band-page-container.component';
import { BandsFilterPipe } from './bands-filter.pipe';



@NgModule({
  declarations: [
    BandPageContainerComponent,
    BandsFilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BandPageModule { }

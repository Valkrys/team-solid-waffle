import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandDetailsContainerComponent } from './band-details-container/band-details-container.component';



@NgModule({
  declarations: [BandDetailsContainerComponent],
  imports: [
    CommonModule
  ],
  exports: [BandDetailsContainerComponent]
})
export class BandDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBandPageContainerComponent } from './add-band-page-container/add-band-page-container.component'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddBandPageContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AddBandPageContainerComponent
  ]
})
export class AddBandPageModule { }

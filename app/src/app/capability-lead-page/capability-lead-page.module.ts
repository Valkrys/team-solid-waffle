import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadContainerComponent } from './lead-container/lead-container.component';



@NgModule({
  declarations: [LeadContainerComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    LeadContainerComponent
  ]
})
export class CapabilityLeadPageModule { }

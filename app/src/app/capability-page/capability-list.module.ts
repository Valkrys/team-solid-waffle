import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapabilityListContainerComponent } from './capability-list-container/capability-list-container.component';
import { FormsModule } from '@angular/forms';
import { CapabilityListPipePipe } from './capability-list-pipe.pipe';


@NgModule({
  declarations: [CapabilityListContainerComponent, CapabilityListPipePipe],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CapabilityListModule { }

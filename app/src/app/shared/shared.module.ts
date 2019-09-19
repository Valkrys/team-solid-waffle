import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditableSingleLineComponent } from './editable-single-line/editable-single-line.component';
import { EditableMultiLineComponent } from './editable-multi-line/editable-multi-line.component';
import { EditableOptionComponent } from './editable-option/editable-option.component';

@NgModule({
  declarations: [
    EditableSingleLineComponent,
    EditableMultiLineComponent,
    EditableOptionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditableSingleLineComponent,
    EditableMultiLineComponent,
    EditableOptionComponent
  ]
})
export class SharedModule { }

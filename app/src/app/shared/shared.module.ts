import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditableSingleLineComponent } from './editable-single-line/editable-single-line.component';
import { EditableMultiLineComponent } from './editable-multi-line/editable-multi-line.component';
import { EditableOptionComponent } from './editable-option/editable-option.component';
import { EditableUlComponent } from './editable-ul/editable-ul.component';

@NgModule({
  declarations: [
    EditableSingleLineComponent,
    EditableMultiLineComponent,
    EditableOptionComponent,
    EditableUlComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EditableSingleLineComponent,
    EditableMultiLineComponent,
    EditableOptionComponent,
    EditableUlComponent
  ]
})
export class SharedModule { }

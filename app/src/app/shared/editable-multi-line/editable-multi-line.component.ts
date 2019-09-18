import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editable-multi-line',
  templateUrl: './editable-multi-line.component.html',
  styleUrls: ['./editable-multi-line.component.css']
})
export class EditableMultiLineComponent implements OnInit {

  @Input() data: string;
  @Input() editMode: boolean = false;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onFocusOut() {
    this.focusOut.emit(this.data);
  }

}

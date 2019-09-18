import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editable-single-line',
  templateUrl: './editable-single-line.component.html',
  styleUrls: ['./editable-single-line.component.css']
})
export class EditableSingleLineComponent implements OnInit {

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

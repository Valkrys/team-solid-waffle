import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Item {
  value: string;
  content: string;
}

@Component({
  selector: 'app-editable-option',
  templateUrl: './editable-option.component.html',
  styleUrls: ['./editable-option.component.css']
})
export class EditableOptionComponent implements OnInit {

  @Input() data: Item[] = [];
  @Input() selected: string;
  @Input() editMode: boolean = false;
  @Output() focusOut: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onFocusOut() {
    this.focusOut.emit(this.selected);
  }

  getSelectedItem(): Item {
    return this.data.find(x => x.value == this.selected);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editable-ul',
  templateUrl: './editable-ul.component.html',
  styleUrls: ['./editable-ul.component.css']
})
export class EditableUlComponent implements OnInit {

  @Input() items: string[];
  @Input() editMode: boolean = false;
  @Output() focusOut: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit() {
  }

  onFocusOut() {
    console.log("Focus out");
    this.focusOut.emit(this.items);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}

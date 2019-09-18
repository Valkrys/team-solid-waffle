import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableUlComponent } from './editable-ul.component';
import { FormsModule } from '@angular/forms';

describe('EditableUlComponent', () => {
  let component: EditableUlComponent;
  let fixture: ComponentFixture<EditableUlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableUlComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableUlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be in view mode by default', () => {
    expect(component.editMode).toBeFalsy();
  });

  it('should render an <ul> when not in edit mode', () => {
    // Make sure editMode is disabled
    component.editMode = false;
    fixture.detectChanges();

    // The component should have one child div element
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('UL');
  });
  
  it('should render a <div> when in edit mode', () => {
    // Make sure editMode is enabled
    component.editMode = true;
    
    // The component should have one child input element
    fixture.detectChanges();
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('DIV');
  });

  it('should update the <ul> contents when the @Input changes', () => {
    const ul = fixture.nativeElement.querySelector('ul');
    expect(ul.children.length).toBe(0);
    
    // Set the @Input data 
    component.items = ['Item 1', 'Item 2'];

    // Check the change is rendered
    fixture.detectChanges();
    expect(ul.children.length).toBe(2);
    expect(ul.children[0].tagName).toBe('LI');
    expect(ul.children[0].innerHTML).toBe('Item 1');
    expect(ul.children[1].tagName).toBe('LI');
    expect(ul.children[1].innerHTML).toBe('Item 2');
  });

  it('should emit an event when the <input> is unfocused', () => {
    spyOn(component.focusOut, 'emit');
    
    // Enable edit mode
    component.editMode = true;
    component.items = ['Item 1', 'Item 2'];
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');
    input.dispatchEvent(new Event('focusout'));

    expect(component.focusOut.emit).toHaveBeenCalledWith(['Item 1', 'Item 2']);
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditableOptionComponent } from './editable-option.component';

describe('EditableOptionComponent', () => {
  let component: EditableOptionComponent;
  let fixture: ComponentFixture<EditableOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableOptionComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // This spec also tests that the component can render when the data is empty
    expect(component).toBeTruthy();
  });

  it('should be in view mode by default', () => {
    expect(component.editMode).toBeFalsy();
  });

  it('should render a <div> when not in edit mode', () => {
    // Make sure editMode is disabled
    component.editMode = false;
    fixture.detectChanges();

    // The component should have one child div element
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('DIV');
  });
  
  it('should render a <select> when in edit mode', () => {
    // Make sure editMode is enabled
    component.editMode = true;
    
    // The component should have one child input element
    fixture.detectChanges();
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('SELECT');
  });

  it('should update the div contents when the @Input changes', () => {
    const div = fixture.nativeElement.querySelector('div');
    // There shouldn't be a value initially
    expect(div.innerHTML).toBe('');
    
    // Set the @Input data 
    component.data = [{value: '1', content: 'One'}, {value: '2', content: 'Two'}];
    component.selected = '2';

    // Check the change is rendered
    fixture.detectChanges();
    expect(div.innerHTML).toBe('Two');
  });

  it('should emit an event when the <select> is unfocused', () => {
    spyOn(component.focusOut, 'emit');
    
    // Enable edit mode
    component.editMode = true;
    fixture.detectChanges();
    
    const select = fixture.nativeElement.querySelector('select');    
    component.data = [{value: '1', content: 'One'}, {value: '2', content: 'Two'}];
    component.selected = '2';
    select.dispatchEvent(new Event('focusout'));

    expect(component.focusOut.emit).toHaveBeenCalledWith('2');
  });
});

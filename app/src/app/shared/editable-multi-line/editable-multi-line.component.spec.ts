import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditableMultiLineComponent } from './editable-multi-line.component';
import { FormsModule } from '@angular/forms';

describe('EditableMultiLineComponent', () => {
  let component: EditableMultiLineComponent;
  let fixture: ComponentFixture<EditableMultiLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableMultiLineComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableMultiLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
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
  
  it('should render a <textarea> when in edit mode', () => {
    // Make sure editMode is enabled
    component.editMode = true;
    
    // The component should have one child input element
    fixture.detectChanges();
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('TEXTAREA');
  });

  it('should update the div contents when the @Input changes', () => {
    const div = fixture.nativeElement.querySelector('div');
    // There shouldn't be a value initially
    expect(div.innerHTML).toBe('');
    
    // Set the @Input data 
    component.data = 'Hello world!';

    // Check the change is rendered
    fixture.detectChanges();
    expect(div.innerHTML).toBe('Hello world!');
  });

  it('should emit an event when the <textarea> is unfocused', () => {
    spyOn(component.focusOut, 'emit');
    
    // Enable edit mode
    component.editMode = true;
    fixture.detectChanges();
    
    const textarea = fixture.nativeElement.querySelector('textarea');    
    component.data = 'Hello world!';
    textarea.dispatchEvent(new Event('focusout'));

    expect(component.focusOut.emit).toHaveBeenCalledWith('Hello world!');
  });
});

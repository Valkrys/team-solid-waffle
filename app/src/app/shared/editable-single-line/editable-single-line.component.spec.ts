import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditableSingleLineComponent } from './editable-single-line.component';

describe('EditableSingleLineComponent', () => {
  let component: EditableSingleLineComponent;
  let fixture: ComponentFixture<EditableSingleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableSingleLineComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableSingleLineComponent);
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
  
  it('should render an <input> when in edit mode', () => {
    // Make sure editMode is enabled
    component.editMode = true;
    
    // The component should have one child input element
    fixture.detectChanges();
    const children = fixture.nativeElement.children;
    expect(children.length).toBe(1);
    expect(children[0].tagName).toBe('INPUT');
    expect(children[0].type).toBe('text');
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

  it('should emit an event when the <input> is unfocused', () => {
    spyOn(component.focusOut, 'emit');
    
    // Enable edit mode
    component.editMode = true;
    fixture.detectChanges();
    
    const input = fixture.nativeElement.querySelector('input');    
    component.data = 'Hello world!';
    input.dispatchEvent(new Event('focusout'));

    expect(component.focusOut.emit).toHaveBeenCalledWith('Hello world!');
  });
});

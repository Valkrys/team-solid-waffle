import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityListContainerComponent } from './capability-list-container.component';

describe('CapabilityListContainerComponent', () => {
  let component: CapabilityListContainerComponent;
  let fixture: ComponentFixture<CapabilityListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapabilityListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

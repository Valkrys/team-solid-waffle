import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBandPageContainerComponent } from './add-band-page-container.component';

describe('AddBandPageContainerComponent', () => {
  let component: AddBandPageContainerComponent;
  let fixture: ComponentFixture<AddBandPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBandPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBandPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

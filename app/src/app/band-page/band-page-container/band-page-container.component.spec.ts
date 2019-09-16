import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPageContainerComponent } from './band-page-container.component';

describe('BandPageContainerComponent', () => {
  let component: BandPageContainerComponent;
  let fixture: ComponentFixture<BandPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

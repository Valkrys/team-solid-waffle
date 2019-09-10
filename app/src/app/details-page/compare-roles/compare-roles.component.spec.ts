import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRolesComponent } from './compare-roles.component';

describe('CompareRolesComponent', () => {
  let component: CompareRolesComponent;
  let fixture: ComponentFixture<CompareRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

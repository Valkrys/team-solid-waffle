import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedRolesComponent } from './related-roles.component';

describe('RelatedRolesComponent', () => {
  let component: RelatedRolesComponent;
  let fixture: ComponentFixture<RelatedRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

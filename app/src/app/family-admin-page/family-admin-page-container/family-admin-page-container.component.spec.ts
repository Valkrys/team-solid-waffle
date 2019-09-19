import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAdminPageContainerComponent } from './family-admin-page-container.component';

describe('FamilyAdminPageContainerComponent', () => {
  let component: FamilyAdminPageContainerComponent;
  let fixture: ComponentFixture<FamilyAdminPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyAdminPageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAdminPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

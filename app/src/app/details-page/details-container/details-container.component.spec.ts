import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { CompareRolesComponent } from "../compare-roles/compare-roles.component";
import { CurrentRoleComponent } from "../current-role/current-role.component";
import { DetailsContainerComponent } from './details-container.component';
import { DescriptionComponent } from '../description/description.component';
import { KeyDetailsComponent } from '../key-details/key-details.component';
import { RelatedRolesComponent } from '../related-roles/related-roles.component';
import { ResponsibilityComponent } from '../responsibility/responsibility.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { TrainingComponent } from '../training/training.component';

describe('DetailsContainerComponent', () => {
  let component: DetailsContainerComponent;
  let fixture: ComponentFixture<DetailsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CompareRolesComponent,
        CurrentRoleComponent,
        DescriptionComponent,
        DetailsContainerComponent,
        KeyDetailsComponent,
        RelatedRolesComponent,
        ResponsibilityComponent,
        TimelineComponent,
        TrainingComponent
      ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

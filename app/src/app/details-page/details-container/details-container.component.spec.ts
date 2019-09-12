import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { DataService } from '../../data.service';
import { CompareRolesComponent } from "../compare-roles/compare-roles.component";
import { CurrentRoleComponent } from "../current-role/current-role.component";
import { DescriptionComponent } from '../description/description.component';
import { KeyDetailsComponent } from '../key-details/key-details.component';
import { RelatedRolesComponent } from '../related-roles/related-roles.component';
import { ResponsibilityComponent } from '../responsibility/responsibility.component';
import { TimelineComponent } from '../timeline/timeline.component';
import { TrainingComponent } from '../training/training.component';
import { DetailsContainerComponent } from './details-container.component';

describe('DetailsContainerComponent', () => {
  let component: DetailsContainerComponent;
  let fixture: ComponentFixture<DetailsContainerComponent>;
  let data: DataService;
  const expectedRoleSpecification = '{roleDescription: "Graduate entry level, here to learn, but primarily to contribute to projects.",' +
    'roleResponsibilities: "Represent Kainos at careers fairs or Kainos open evenings events if invited.' +
    'Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.' +
    ' Notify your line manager if there are dependencies that are impacting your work. ' +
    'Escalate to your line manager if you do not have appropriate project goals. ' +
    'Notify HR if you have not received your project review on time, ' +
    'trainingDescription": "www.google.com"}';

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
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    data = TestBed.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HttpClient response check for roleSpecification', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get('/api/roleSpecification/technical/software-engineering/trainee').subscribe((actualRoleSpecification) => {
          expect(actualRoleSpecification).toEqual(expectedRoleSpecification);
        });
        backend.match({
          url: '/api/roleSpecification/technical/software-engineering/trainee',
          method: 'GET'
        });
      })
    )
    );
  });
});

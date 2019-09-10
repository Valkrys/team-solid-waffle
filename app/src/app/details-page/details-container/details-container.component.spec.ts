import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Capability } from 'src/app/capability';
import { Role } from 'src/app/role';
import { DataService } from '../../data.service';
import { DetailsPageModule } from '../details-page.module';
import { DetailsContainerComponent } from './details-container.component';

describe('DetailsContainerComponent', () => {
  let component: DetailsContainerComponent;
  let fixture: ComponentFixture<DetailsContainerComponent>;
  let data: DataService;

  const expectedRoleSpecification = '{' +
    'roleDescription: "Graduate entry level, here to learn, but primarily to contribute to projects.",' +
    'roleResponsibilities: "Represent Kainos at careers fairs or Kainos open evenings events if invited.' +
    'Immediately tell your manager if your tasks are not going to be complete within the expected timeframe.' +
    ' Notify your line manager if there are dependencies that are impacting your work. ' +
    'Escalate to your line manager if you do not have appropriate project goals. ' +
    'Notify HR if you have not received your project review on time, ' +
    'trainingDescription": "www.google.com"' +
    '}';

  const expectedBandHierarchy = '[' +
    '{"bandName": "Apprentice", "roleName": "Software Engineer", "bandRank": 1 }, ' +
    '{"bandName": "Trainee", "roleName": "Software Engineer", "bandRank": 2 }, ' +
    '{"bandName": "Associate", "roleName": "Software Engineer", "bandRank": 3 }, ' +
    '{"bandName": "Senior Associate", "roleName": "Software Engineer", "bandRank": 4 }, ' +
    '{"bandName": "Consultant", "roleName": "Lead Software Engineer", "bandRank": 5 }' +
    ']';

  const expectedCapability = '"capabilityName": "Software Engineering"';
  const expectedBand = '"bandName": "Apprentice"';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        DetailsPageModule
      ],
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
    ));
  });

  describe('HttpClient response check for timeline', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get('/api/capabilities_roles/Software-Engineering').subscribe((actualBandHierarchy) => {
          expect(actualBandHierarchy).toEqual(expectedBandHierarchy);
        });
        backend.match({
          url: '/capabilities_roles/Software-Engineering',
          method: 'GET'
        });
      })
    )
    );
  });

  describe('HttpClient response check for capability', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get<Capability>('/api/keyDetails/1').subscribe((actualCapability) => {
          expect(actualCapability.capabilityName).toEqual(expectedCapability);
        });
        backend.match({
          url: '/api/keyDetails/1',
          method: 'GET'
        });
      })
    ));
  });

  describe('HttpClient response check for band', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get<Role>('/api/keyDetails/1').subscribe((actualCapability) => {
          expect(actualCapability.bandName).toEqual(expectedBand);
        });
        backend.match({
          url: '/api/keyDetails/1',
          method: 'GET'
        });
      })
    ));
  });
});

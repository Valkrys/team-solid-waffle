import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RelatedRolesComponent } from './related-roles.component';
import { CarouselRole } from 'src/app/carouselRole';
import { DataService } from '../../data.service';

describe('RelatedRolesComponent', () => {
  let component: RelatedRolesComponent;
  let fixture: ComponentFixture<RelatedRolesComponent>;
  let data: DataService;
  const expectedRelatedRole = `{
      "roleName": "Designer",
      "capabilityName": "UX Design",
      "jobFamilyName": "Experience Design"
    }`;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedRolesComponent ],
      imports: [HttpClientTestingModule]
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


  describe('HttpClient response check for related role', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get<CarouselRole>('/api/carousel/Trainee').subscribe((actualRelatedRole) => {
           expect(actualRelatedRole[0]).toEqual(expectedRelatedRole);
        });
        backend.match({
          url: '/api/carousel/Trainee',
          method: 'GET'
        });
      })
      )
    );
  });


});


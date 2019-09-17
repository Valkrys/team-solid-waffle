import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { BandDetailsContainerComponent } from './band-details-container.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Band} from '../../band';
import {DataService} from "../../data.service";

describe('BandDetailsContainerComponent', () => {
  let component: BandDetailsContainerComponent;
  let fixture: ComponentFixture<BandDetailsContainerComponent>;
  const expectedBandCommercial = '{' +
    '     You understand the contribution your role makes to the success of the business, consistently delivering to task deadlines.' +
    '     You understand and the need for the business to generate additional income and respect that costs need to be managed.' +
    '     You know what you have to do to manage costs within the business.' +
    '     You complete expenses honestly, on time and accurately.' +
    '     You consistently achieve your personal productive utilisation target.' +
    '     You understand how your team supports increased income for Kainos.' +
    '}';
  const expectedBandCommunication = '{' +
    '     You get involved at meetings, ask questions, listen and give honest information when appropriate.' +
    '     You actively participate and cooperate within the team helping others and sharing workload.' +
    '     You focus on shared goals playing a full part in their successful completion.' +
    '     You are communicative and clear in your thoughts and ideas when approached by others.' +
    '     You give consideration to the communication needs of staff in other locations. ' +
    '     You are able to interact effectively in a situation you find stressful or frustrating knowing when to ' +
    '     remove yourself from a situation to allow you to compose yourself.' +
    '     You have an awareness of the activities in other jobs and departments.' +
    '}';
  const expectedBandInnovation = '{' +
    '      You actively seek out colleagues in order to share thoughts and ideas that may be use or interest to them.' +
    '      Your share your ideas (creative) with colleagues and seek support from management in developing those ideas.' +
    '      You share information, insights or comments in order to improve an individual/an area of the business.' +
    '      when it would be easier to refrain from doing so.' +
    '}';
  const expectedBandCustomerFocus = '{' +
    '     You know who your customer is and what problem the team is trying to solve.' +
    '     You consistently strive to provide a quality service and showcase Kainos positively.' +
    '}';
  const expectedBandDevelopment = '{' +
    '     You seek out new challenges that may stretch your abilities.' +
    '     You learn from people and ask for their ideas and opinions.' +
    '     You are cooperative and ask others to participate in meetings/activities where you think that they can add value. ' +
    '     You manage your emotions and respond honestly and calmly when under pressure.' +
    '     You are able to identify analyse a problem and either drill down to the root cause or escalate to another for help.' +
    '     You are quick to take considered action in order to achieve a positive outcome when faced with an opportunity or problem.' +
    '     You explain technical or specialist information to new or less experienced colleagues to enable them to do their jobs.' +
    '     You have your own internal standards of performance which match or exceed those imposed by others.' +
    '}';
  const expectedBandPlanning = '{' +
    '     You plan your time effectively and consistently meet task deadlines.' +
    '     You keep honest records of your achievements to discuss with your manager during your 1-2-1.' +
    '}';

  const expectedBandKnowledge = '{' +
    '     You respect the need for you to do your role well and actively learn the functional and technical' +
    '     knowledge and skills that are necessary to do your job with a high level of accomplishment (determined).' +
    '     You use appropriate tools, technology or process for the task.' +
    '     You take decisions independently and are able to get on with your job, escalating decisions only when appropriate.' +
    '}';
  const expectedBandTraining = '{' +
    'www.google.com' +
    '}';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandDetailsContainerComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('HttpClient response check for bandDetails competencies', () => {
    it('should respond with fake data', async(inject
      ([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
        http.get<Band>('/api/band/2').subscribe((actualCompetenciesList) => {
          expect(actualCompetenciesList.commercial).toEqual(expectedBandCommercial);
          expect(actualCompetenciesList.communication).toEqual(expectedBandCommunication);
          expect(actualCompetenciesList.customerFocus).toEqual(expectedBandCustomerFocus);
          expect(actualCompetenciesList.innovation).toEqual(expectedBandInnovation);
          expect(actualCompetenciesList.knowledge).toEqual(expectedBandKnowledge);
          expect(actualCompetenciesList.development).toEqual(expectedBandDevelopment);
          expect(actualCompetenciesList.planning).toEqual(expectedBandPlanning);
          expect(actualCompetenciesList.trainingDescription).toEqual(expectedBandTraining);
        });
        backend.match({
          url: '/api/band/2',
          method: 'GET'
        });
      })
    ));
  });
});

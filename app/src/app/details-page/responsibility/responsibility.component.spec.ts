import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityComponent } from './responsibility.component';
import {DataService} from '../../data.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ResponsibilityComponent', () => {
  let component: ResponsibilityComponent;
  let fixture: ComponentFixture<ResponsibilityComponent>;
  let data: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibilityComponent ],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    data = TestBed.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('splitResponsibilities', () => {
    it('should split responsibilities', async(() => {
      const result = data.splitResponsibilitiess('should be respectful.should be honest');
      expect(result).toEqual([ 'should be respectful', 'should be honest' ]);
    }));

    it('should split null responsibilities', async(() => {
      const result = data.splitResponsibilitiess('');
      expect(result).toEqual([ '' ]);
    }));
  });
});

import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { TrainingComponent } from './training.component';
import { DataService } from '../../data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let data: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [DataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    data = TestBed.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('splitTraining', () => {
    it('should split training', async(() => {
      const result = data.splitTraining('www.google.com,www.google.com');
      expect(result).toEqual([ 'www.google.com', 'www.google.com' ]);
    }));

    it('should split null training', async(() => {
      const result = data.splitTraining('');
      expect(result).toEqual([ '' ]);
    }));

    it('should not split training', async(() => {
      const result = data.splitTraining('www.google.com');
      expect(result).toEqual(['www.google.com']);
    }));
  });
});

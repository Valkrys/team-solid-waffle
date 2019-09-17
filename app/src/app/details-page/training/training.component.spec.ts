import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DataService } from '../../data.service';
import { TrainingComponent } from './training.component';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;
  let data: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingComponent],
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

  describe('HttpClient', () => {
    it('should issue request', async(inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
      http.get('/api/roleSpecification/technical/software-engineering/trainee').subscribe();
      backend.match({
        url: '/api/roleSpecification/technical/software-engineering/trainee',
        method: 'GET'
      });
    }))
    );
  });

  describe('splitTraining', () => {
    it('should split training', async(() => {
      const result = data.splitTraining('www.google.com,www.google.com');
      expect(result).toEqual(['www.google.com', 'www.google.com']);
    }));

    it('should split null training', async(() => {
      const result = data.splitTraining('');
      expect(result).toEqual(['']);
    }));

    it('should not split training', async(() => {
      const result = data.splitTraining('www.google.com');
      expect(result).toEqual(['www.google.com']);
    }));
  });
});

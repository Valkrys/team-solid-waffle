import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
});

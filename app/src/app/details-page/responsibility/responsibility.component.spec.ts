import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../../data.service';
import { ResponsibilityComponent } from './responsibility.component';

describe('ResponsibilityComponent', () => {
  let component: ResponsibilityComponent;
  let fixture: ComponentFixture<ResponsibilityComponent>;
  let data: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResponsibilityComponent],
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
});

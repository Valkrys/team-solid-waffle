import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CapabilityListPipePipe } from '../capability-list-pipe.pipe';
import { CapabilityListContainerComponent } from './capability-list-container.component';



describe('CapabilityListContainerComponent', () => {
  let component: CapabilityListContainerComponent;
  let fixture: ComponentFixture<CapabilityListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CapabilityListContainerComponent,
        CapabilityListPipePipe],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapabilityListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

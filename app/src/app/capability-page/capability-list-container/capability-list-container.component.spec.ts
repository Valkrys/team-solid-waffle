import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapabilityListContainerComponent } from './capability-list-container.component';

import { FormsModule } from '@angular/forms';
import { CapabilityListPipePipe } from '../capability-list-pipe.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, RouterModule } from '@angular/router';

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
        RouterModule
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleContainerComponent } from './add-role-container.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddRoleContainerComponent', () => {
  let component: AddRoleContainerComponent;
  let fixture: ComponentFixture<AddRoleContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoleContainerComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoleContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});


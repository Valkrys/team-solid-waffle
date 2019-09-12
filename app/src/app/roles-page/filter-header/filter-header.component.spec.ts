import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeaderComponent } from './filter-header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        FilterHeaderComponent,
        SearchBarComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

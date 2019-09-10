import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPageContainerComponent } from './roles-page-container.component';
import { FilterHeaderComponent } from '../filter-header/filter-header.component';
import { CardsComponent } from '../cards/cards.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';

describe('RolesPageContainerComponent', () => {
  let component: RolesPageContainerComponent;
  let fixture: ComponentFixture<RolesPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        RolesPageContainerComponent,
        FilterHeaderComponent,
        CardsComponent,
        SearchBarComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

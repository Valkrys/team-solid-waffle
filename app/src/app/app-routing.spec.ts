import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "./app-routing.module";
import { Location } from '@angular/common';
import { CompareRolesComponent } from './details-page/compare-roles/compare-roles.component';
import { CurrentRoleComponent } from './details-page/current-role/current-role.component';
import { DescriptionComponent } from './details-page/description/description.component';
import { DetailsContainerComponent } from './details-page/details-container/details-container.component';
import { KeyDetailsComponent } from './details-page/key-details/key-details.component';
import { RelatedRolesComponent } from './details-page/related-roles/related-roles.component';
import { ResponsibilityComponent } from './details-page/responsibility/responsibility.component';
import { TimelineComponent } from './details-page/timeline/timeline.component';
import { TrainingComponent } from './details-page/training/training.component';
import { CardsComponent } from './roles-page/cards/cards.component';
import { FilterHeaderComponent } from './roles-page/filter-header/filter-header.component';
import { RolesPageContainerComponent } from './roles-page/roles-page-container/roles-page-container.component';
import { SearchBarComponent } from './roles-page/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { CapabilityFilterPipe } from './roles-page/capability-filter.pipe';
import { RolesPageModule } from './roles-page/roles-page.module';
import { DetailsPageModule } from './details-page/details-page.module';


describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        RolesPageModule,
        DetailsPageModule
      ],
      declarations: [
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });
  
  it('fakeAsync works', fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /', fakeAsync(() => {
    router.navigate(['/']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/');
    });
  }));

  it('navigate to "roles" redirects you to /roles', fakeAsync(() => {
    router.navigate(['/roles']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/roles');
    });
  }));

  it('navigate to "details" redirects you to /details', fakeAsync(() => {
    router.navigate(['/details']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/details');
    });
  }));
});

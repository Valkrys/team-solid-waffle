import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AddBandPageModule } from './add-band-page/add-band-page.module';
import { AddRolePageModule } from './add-role-page/add-role-page.module';
import { routes } from './app-routing.module';
import { BandPageModule } from './band-page/band-page.module';
import { CapabilityLeadPageModule } from './capability-lead-page/capability-lead-page.module';
import { CapabilityListModule } from './capability-page/capability-list.module';
import { DetailsPageModule } from './details-page/details-page.module';
import { RolesPageModule } from './roles-page/roles-page.module';


describe('Router', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        RolesPageModule,
        DetailsPageModule,
        BandPageModule,
        CapabilityListModule,
        CapabilityLeadPageModule,
        AddRolePageModule,
        AddBandPageModule
      ],
      declarations: [
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise(resolve => {
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

  it('navigate to "bands" redirects you to /bands', fakeAsync(() => {
    router.navigate(['/bands']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/bands');
    });
  }));

  it('navigate to "capabilities" redirects you to /capabilities', fakeAsync(() => {
    router.navigate(['/capabilities']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/capabilities');
    });
  }));
  
  it('navigate to "capability" redirects you to /capability/{id}', fakeAsync(() => {
    router.navigate(['/capability/:id']).then(() => {
      tick(1000);
      expect(location.path()).toBe('/capability/:id');
    });
  }));

});

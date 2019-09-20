import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandPageContainerComponent } from './band-page-container.component';
import { FormsModule } from '@angular/forms';
import { BandsFilterPipe } from '../bands-filter.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { DetailsPageModule } from 'src/app/details-page/details-page.module';
import { RolesPageModule } from 'src/app/roles-page/roles-page.module';
import { CapabilityListModule } from 'src/app/capability-page/capability-list.module';
import { AddBandPageModule } from 'src/app/add-band-page/add-band-page.module';
import { CapabilityLeadPageModule } from 'src/app/capability-lead-page/capability-lead-page.module';
import { AddRolePageModule } from 'src/app/add-role-page/add-role-page.module';

describe('BandPageContainerComponent', () => {
  let component: BandPageContainerComponent;
  let fixture: ComponentFixture<BandPageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BandPageContainerComponent,
        BandsFilterPipe
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        DetailsPageModule,
        RolesPageModule,
        CapabilityListModule,
        AddBandPageModule,
        RouterModule.forRoot(routes),
        CapabilityLeadPageModule,
        AddRolePageModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandPageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

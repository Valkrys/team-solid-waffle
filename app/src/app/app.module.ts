import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandPageModule } from './band-page/band-page.module';
import { CapabilityLeadPageModule } from './capability-lead-page/capability-lead-page.module';
import { CapabilityListModule } from './capability-page/capability-list.module';
import { DetailsPageModule } from './details-page/details-page.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RolesPageModule } from './roles-page/roles-page.module';
import { FamilyAdminPageModule } from './family-admin-page/family-admin-page.module'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DetailsPageModule,
    HttpClientModule,
    NgbModule,
    RolesPageModule,
    BandPageModule,
    CapabilityListModule,
    CapabilityLeadPageModule,
    FamilyAdminPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

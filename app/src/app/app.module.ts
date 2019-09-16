import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageModule } from './details-page/details-page.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RolesPageModule } from './roles-page/roles-page.module';
import { BandPageModule } from './band-page/band-page.module'
import { AddRolePageModule } from './add-role-page/add-role-page.module';

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
    AddRolePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

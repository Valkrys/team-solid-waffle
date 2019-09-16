import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsPageModule } from './details-page/details-page.module';
import { RolesPageModule } from './roles-page/roles-page.module';
import { NavbarComponent } from './navbar/navbar.component';
import {BandDetailsModule} from './band-details/band-details.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DetailsPageModule,
    HttpClientModule,
    NgbModule,
    RolesPageModule,
    BandDetailsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Role } from './role';
import { KeyDetails } from './keyDetails';
import { TimelineRole } from './timelineRole';
import { CarouselRole } from './carouselRole';
import {Band} from './band';
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public role: Role;
  public band: Band;
  public keyDetails: KeyDetails;
  public timelineRole: TimelineRole;
  public carouselRole: CarouselRole[] = [];

  constructor(private http: HttpClient) {
    this.getRoleSpecification();
    this.getUser();
    this.getKeyDetails();
    this.getTimelineRoles();
    this.getCarouselRoleDetails();
  }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
      this.user = user;
    });
  }

  public getRoleSpecification(): void {
    this.http.get<Role>('/api/roleSpecification/technical/software-engineering/trainee').subscribe(role => {
      this.role = role;
    });
  }

  public getKeyDetails(): void {
    this.http.get<KeyDetails>('/api/keyDetails/1').subscribe(keyDetails => {
      this.keyDetails = keyDetails;
    });
  }

  public getTimelineRoles(): void {
    this.http.get<TimelineRole>('api/capabilities_roles/Software-Engineering').subscribe(timelineRole => {
      this.timelineRole = timelineRole;
    });
  }

  public getCarouselRoleDetails(): void {
    this.http.get<CarouselRole[]>('/api/carousel/Trainee').subscribe(carouselRoleDetails => {
      this.carouselRole = carouselRoleDetails;
    });
  }

  /* TO DO: make api call dynamic */
  public getBandDetails(id: number): Observable<Band> {
    return this.http.get<Band>(`/api/band/${id}`);
  }
}



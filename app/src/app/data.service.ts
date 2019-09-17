import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Role } from './role';
import { KeyDetails } from './keyDetails';
import { TimelineRole } from './timelineRole';
import { CarouselRole } from './carouselRole';
import {Band} from './band';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public role: Role;
  public band: Band;

  public splittedRoleResponsibilities: string[];
  public splittedRoleTraining: string[];

  public splittedBandCommercial: string[];
  public splittedBandCommunication: string[];
  public splittedBandInnovation: string[];
  public splittedBandCustomerFocus: string[];
  public slittedBandDevelopment: string[];
  public slittedBandPlanning: string[];
  public slittedBandKnowledge: string[];

  public splittedBandTraining: string[];
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
      console.log(user);
      this.user = user;
    });
  }

  public getRoleSpecification(): void {
    this.http.get<Role>('/api/roleSpecification/technical/software-engineering/trainee').subscribe(role => {
      this.role = role;
      this.splittedRoleResponsibilities = this.split(this.role.roleResponsibilities, '.');
      this.splittedRoleTraining = this.split(this.role.trainingDescription, ',');
    });
  }

  public split(toBeSpilitted: string, separator: string) {
      return toBeSpilitted.split(separator);
  }


  public getKeyDetails(): void {
    this.http.get<KeyDetails>('/api/keyDetails/1').subscribe(keyDetails => {
      this.keyDetails = keyDetails;
      console.log(this.keyDetails);
    });
  }

  public getTimelineRoles(): void {
    this.http.get<TimelineRole>('api/capabilities_roles/Software-Engineering').subscribe(timelineRole => {
      console.log(timelineRole.bandName);
      this.timelineRole = timelineRole;
    });
  }

  public getCarouselRoleDetails(): void {
    this.http.get<CarouselRole[]>('/api/carousel/Trainee').subscribe(carouselRoleDetails => {
      this.carouselRole = carouselRoleDetails;
    });
  }

  /* TO DO: make api call dynamic */
  public getBandDetails(): void {
    this.http.get<Band>('/api/band/2').subscribe(band => {
        this.band = band;
        this.splittedBandCommercial = this.split(this.band.commercial, '.');
        this.splittedBandCommunication = this.split(this.band.communication, '.');
        this.splittedBandInnovation = this.split(this.band.innovation, '.');
        this.splittedBandCustomerFocus = this.split(this.band.customerFocus, '.');
        this.slittedBandDevelopment = this.split(this.band.development, '.');
        this.slittedBandPlanning = this.split(this.band.planning, '.');
        this.slittedBandKnowledge = this.split(this.band.knowledge, '.');
        this.splittedBandTraining = this.split(this.band.trainingDescription, ',');
    });
  }
}



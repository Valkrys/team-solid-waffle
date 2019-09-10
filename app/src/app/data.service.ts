import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from './band';
import { Capability } from './capability';
import { CarouselRole } from './carouselRole';
import { Family } from './family';
import { KeyDetails } from './keyDetails';
import { Role } from './role';
import { Roles } from './roles';
import { TimelineRole } from './timelineRole';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public role: Role;
  public splittedResponsibilities: string[];
  public splittedTraining: string[];
  public keyDetails: KeyDetails;
  public timelineRole: TimelineRole;
  public capability: Capability;
  public band: Band;
  public family: Family;
  public roles: Roles;
  public carouselRole: CarouselRole[] = [];

  constructor(private http: HttpClient) {
    this.getBand();
    this.getCapability();
    this.getCarouselRoleDetails();
    this.getFamily();
    this.getKeyDetails();
    this.getRoles();
    this.getRoleSpecification();
    this.getTimelineRoles();
    this.getUser();
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
      this.splitResponsibilitiess(this.role.roleResponsibilities);
      this.splitTraining(this.role.trainingDescription);
    });
  }

  public splitResponsibilitiess(resp: string) {
    this.splittedResponsibilities = resp.split('.');
    return this.splittedResponsibilities;
  }

  public splitTraining(training: string) {
    this.splittedTraining = training.split(',');
    return this.splittedTraining;
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

  public getRoles(): void {
    this.http.get<Roles>('/api/roles').subscribe(roles => {
      this.roles = roles;
    });
  }

  public getFamily(): void {
    this.http.get<Family>('/api/family').subscribe(family => {
      this.family = family;
    });
  }

  public getCapability(): void {
    this.http.get<Capability>('/api/capability').subscribe(capability => {
      this.capability = capability;
      console.log(capability);
    });
  }

  public getBand(): void {
    this.http.get<Band>('/api/band').subscribe(band => {
      this.band = band;
    });
  }
}


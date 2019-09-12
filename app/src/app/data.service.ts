import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';
import { Role } from './role';
import { KeyDetails } from './keyDetails';
import { TimelineRole } from './timelineRole';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public user: User;
  public role: Role;
  public timelineRole: TimelineRole;
  public splittedResponsibilities: string[];
  public splittedTraining: string[];
  public keyDetails: KeyDetails;

  constructor(private http: HttpClient) {
    this.getUser();
    this.getRoleSpecification();
    this.getKeyDetails();
    this.getTimelineRoles();
   }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }
  
  public getTimelineRoles(): void
  {
    this.http.get<TimelineRole>('/api/capabilities_roles/Software-Engineering').subscribe(timelineRole => {
      console.log(timelineRole[0].roleName);
      this.timelineRole = timelineRole;
    });
  }

  public getRoleSpecification(): void {
    this.http.get<Role>('/api/technical/software-engineering/trainee').subscribe(role => {
      this.role = role;
      this.splitResponsibilitiess(this.role);
      this.splitTraining(this.role);
    });
  }

  public splitResponsibilitiess(role: Role)
  {
    this.splittedResponsibilities = this.role.responsibilities.split('.');
    return this.splittedResponsibilities;
  }

  public splitTraining(role: Role)
  {
    this.splittedTraining = this.role.training.split('.');
    return this.splittedTraining;
  }

  public getKeyDetails(): void {
    this.http.get<KeyDetails>('/api/keyDetails/1').subscribe(keyDetails => {
      this.keyDetails = keyDetails;
      console.log(this.keyDetails);
    });
  }

}

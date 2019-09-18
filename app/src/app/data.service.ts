import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Role } from './role';
import { KeyDetails } from './keyDetails';
import { TimelineRole } from './timelineRole';
import { CarouselRole } from './carouselRole';
import * as moment from 'moment';


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
  public token: string;
  public correctLogin: boolean;

  public carouselRole: CarouselRole[] = [];
  constructor(private http: HttpClient) {
    this.getUser();
    this.getRoleSpecification();
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

  public login(user: User): void {
    this.http.post<any>('api/login', {username: user.username, password: user.password}).subscribe(res => {  
      if(res == null){
        console.error(res);
      }
      else
      {
        if(res.token)
        {
          const expiresAt = moment().add(res.expiresIn,'second');
          localStorage.setItem('token', res.token);
          localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
          this.correctLogin = true;
        }
        else
        {
          this.correctLogin = false;
        }
        
      }

    });
  }

  public loggedIn()
  {
    console.log("***********************");
    
    console.log(document.cookie);
    
    return !!localStorage.getItem('token');
  }

  public getToken()
  {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
  }

}



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public user: User;
  public role: Role;
  public splittedResponsibilities: string[];
  public splittedTraining: string[];

  //public description: String;
  

  constructor(private http: HttpClient) {
    this.getUser();
    this.getRoleSpecification();
   }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
      console.log(user);
      this.user = user;
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


}

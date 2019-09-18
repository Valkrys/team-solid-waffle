import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from './band';
import { Capability } from './capability';
import { Family } from './family';
import { Role } from './role';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;

  constructor(private http: HttpClient) {
    this.getUser();
  }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

<<<<<<< HEAD
  public getRoleDetail(id: number): Observable<Role> {
    return this.http.get<Role>(`/api/role/${id}`);
=======
  public getRoleSpecification(): void {
    this.http.get<Role>('/api/roleSpecification/technical/software-engineering/trainee').subscribe(role => {
      this.role = role;
      console.log(role)
      this.splitResponsibilitiess(this.role.responsibilities);
      this.splitTraining(this.role.training);
    });
  }

  public splitResponsibilitiess(resp: string) {
    this.splittedResponsibilities = resp.split('.');
    return this.splittedResponsibilities;
>>>>>>> added light invalid messages
  }

  public getRoleList(): Observable<Role[]> {
    return this.http.get<Role[]>('/api/roles');
  }

  public getCapabilityList(): Observable<Capability[]> {
    return this.http.get<Capability[]>('/api/capabilities');
  }

  public getFamilyList(): Observable<Family[]> {
    return this.http.get<Family[]>('/api/families');
  }

<<<<<<< HEAD
  public getBandList(): Observable<Band[]> {
    return this.http.get<Band[]>('/api/bands');
=======
  public getCarouselRoleDetails(): void {
    this.http.get<CarouselRole[]>('/api/carousel/Trainee').subscribe(carouselRoleDetails => {
      this.carouselRole = carouselRoleDetails;
    });
>>>>>>> added directive to check invalid band capability
  }
}


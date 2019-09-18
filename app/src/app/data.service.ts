import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from './band';
import { Capability } from './capability';
import { Family } from './family';
import { Role } from './role';
import { User } from './user';
import { Training } from './training';

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

  public getRoleDetail(id: number): Observable<Role> {
    return this.http.get<Role>(`/api/role/${id}`);
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

  public getBandList(): Observable<Band[]> {
    return this.http.get<Band[]>('/api/bands');
  }

  public getTrainingList(): Observable<Training[]> {
    return this.http.get<Training[]>('/api/trainings');
  }

  /*----------POST------------*/
  public addNewRole(role : Role) {
    this.http.post<Role>('/api/add_role', role).subscribe(res => {
        console.log('POSTED');
    });

  }
}


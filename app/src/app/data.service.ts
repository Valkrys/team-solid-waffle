import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from './band';
import { Capability } from './capability';
import { CapabilityLead } from './capabilityLead';
import { Family } from './family';
import { Role } from './role';
import { Training } from './training';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public role: Role;
  public splittedResponsibilities: string[];
  public splittedTraining: string[];

  constructor(private http: HttpClient) {
    this.getUser();
  }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
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

  public getCapabilityLeadDetails(id: number): Observable<CapabilityLead> {
    return this.http.get<CapabilityLead>(`/api/capability/${id}`);
  }
  
  public getTrainingList(): Observable<Training[]> {
    return this.http.get<Training[]>('/api/trainings');
  }

  /*----------POST------------*/
  public addNewRole(role : Role): Observable<Role> {
    return this.http.post<Role>('/api/role', role);
  }
  
  public addBand(newBand: Band): Observable<Band> {
    console.log('add band call', newBand);
    return this.http.post<Band>('api/band', newBand);
  }

  public addTraining(newTraining: Training): Observable<Training> {
    return this.http.post<Training>('api/training', newTraining);
  }

  public getBandDetails(id: number): Observable<Band> {
    return this.http.get<Band>(`/api/band/${id}`);
  }
}


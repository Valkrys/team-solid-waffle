import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from './band';
import { Capability } from './capability';
import { Family } from './family';
import { Role } from './role';
import { User } from './user';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public token: string;
  public correctLogin: boolean;

  constructor(private http: HttpClient, private router: Router) {
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
          this.router.navigate(['/details']);
          this.correctLogin = true;
        }
        
      }

    });
  }

  public loggedIn()
  {
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


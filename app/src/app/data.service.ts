import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from './band';
import { Capability } from './capability';
import { Family } from './family';
import { Role } from './role';
import { Roles } from './roles';
import * as moment from 'moment';
import { User } from './user';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: User;
  public role: Role;
  public splittedResponsibilities: string[];
  public splittedTraining: string[];
  public token: string;
  public correctLogin: boolean;
  public capability: Capability;
  public band: Band;
  public family: Family;
  public roles: Roles;
  public failure: string;

  constructor(private http: HttpClient, private router: Router) {
    this.failure = "";
    this.getUser();
    this.correctLogin = false;
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

  public login(userDetails: User): void {
    this.http.post<any>('api/login', {username: userDetails.username, password: userDetails.password}).subscribe(res => {  
      if(res == null){
        console.error(res);
      }
      else if (res.message == "Wrong username")
      {
        document.getElementById("failureMsg").innerHTML = "Wrong username";
        this.failureMessage();
        res.status(401).send({messgae: 'Wrong username'});
      }
      else if (res.message == "Wrong password")
      {
        document.getElementById("failureMsg").innerHTML = "Wrong password";
        this.failureMessage();
        res.status(401).send('Wrong password');
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
          this.user = jwt_decode(res.token);
        }
        
      }
    });
  }


  failureMessage() {
    setTimeout(() => {
      document.getElementById("failureMsg").innerHTML = "";
    }, 5000);
  }
  

  public loggedIn()
  {
    return !!localStorage.getItem('token');
  }

  public getToken()
  {
    return localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

}
  



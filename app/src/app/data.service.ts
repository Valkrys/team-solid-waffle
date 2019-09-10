import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';

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
}

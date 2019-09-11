import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';
import { KeyDetails } from './keyDetails';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  public user: User;
  public keyDetails: KeyDetails;

  constructor(private http: HttpClient) {
    this.getUser();
    this.getKeyDetails();
   }

  public getUser(): void {
    this.http.get<User>('/api/user_role').subscribe(user => {
      console.log(user);
      this.user = user;
    });
  } 

  public getKeyDetails(): void {
    this.http.get<KeyDetails>('/api/keyDetails/1').subscribe(keyDetails => {
      this.keyDetails = keyDetails;
      console.log(this.keyDetails);
    });
  }


}

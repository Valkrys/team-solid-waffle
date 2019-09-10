import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User} from './user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  userDetails = this.http.get<User[]>('/api/user_role');
}

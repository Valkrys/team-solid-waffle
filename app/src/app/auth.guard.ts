import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dataservice: DataService, private router: Router)
  {

  }

  canActivate(): boolean {
    if (this.dataservice.loggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}

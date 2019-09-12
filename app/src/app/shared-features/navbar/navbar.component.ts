import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  data: DataService;

  constructor(private router: Router, dataservice: DataService) { 
    this.data = dataservice;
  }

  

  ngOnInit() {
  }

  changeNavIfSigned(path: string)
  {
    if(path == '')
    {
      this.data.logout();
    }
    
    this.router.navigate(['/' + path]);
  }

}
